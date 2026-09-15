import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

type Entry = { data: any; etag: string } | null;
export type Storage = {
  read(key: string): Promise<Entry>;
  write(key: string, data: any, etag: string | null): Promise<boolean>;
};
export type Settings = {
  origin: string; googleClientId?: string; ownerEmail: string;
  ownerCodeHash?: string; ownerCodeExpires?: number;
};
type Services = { storage: Storage; settings: Settings; verifyGoogle: (token: string) => Promise<any>; now?: () => number };
class HttpError extends Error { status: number; constructor(status: number, message: string) { super(message); this.status = status; } }
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const secret = () => randomBytes(32).toString('base64url');
const canonical = (v: any): string => Array.isArray(v) ? `[${v.map(canonical).join(',')}]` : v !== null && typeof v === 'object' ? `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}` : JSON.stringify(v);
const equal = (a: string, b: string) => typeof a === 'string' && typeof b === 'string' && timingSafeEqual(Buffer.from(digest(a)), Buffer.from(digest(b)));
const text = (v: any, name: string, max = 120) => { if (typeof v !== 'string' || !v.trim() || v.length > max) throw new HttpError(400, `Check ${name}.`); return v.trim(); };
const id = (v: any) => { const s = text(v, 'identifier', 100); if (!/^[A-Za-z0-9_-]+$/.test(s)) throw new HttpError(400, 'Invalid identifier.'); return s; };
const utc = (v: any, now: number) => { if (typeof v !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(v)) throw new HttpError(400, 'Use a UTC timestamp.'); const t = Date.parse(v); if (!Number.isFinite(t) || new Date(t).toISOString().slice(0,19) !== v.slice(0,19) || t > now + 300000 || t < now - 7*86400000) throw new HttpError(400, 'Event time must be valid and within seven days.'); return new Date(t).toISOString(); };
const cookie = (name: string, value: string, seconds: number) => `${name}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${seconds}`;
const cookies = (r: Request) => Object.fromEntries((r.headers.get('cookie') || '').split(';').filter(s=>s.includes('=')).map(s=>{ const n=s.indexOf('=');return [s.slice(0,n).trim(),s.slice(n+1).trim()]; }));
async function json(r: Request) {
  if (!r.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new HttpError(415, 'Send JSON.');
  if (Number(r.headers.get('content-length') || 0) > 32768) throw new HttpError(413, 'Request is too large.');
  const reader = r.body?.getReader(); if (!reader) throw new HttpError(400, 'JSON body required.');
  let size=0; const chunks: Uint8Array[]=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>32768){await reader.cancel();throw new HttpError(413,'Request is too large.');}chunks.push(value);}
  try { const value=JSON.parse(Buffer.concat(chunks).toString('utf8')); if(!value || typeof value!=='object' || Array.isArray(value))throw 0; return value; } catch { throw new HttpError(400,'Invalid JSON object.'); }
}
export function application({ storage, settings, verifyGoogle, now = Date.now }: Services) {
  async function change(key: string, initial: () => any, fn: (data: any) => any) {
    for(let attempt=0;attempt<6;attempt++) {
      const old=await storage.read(key), data=structuredClone(old?.data ?? initial());
      const result=fn(data); if(await storage.write(key,data,old?.etag ?? null)) return result;
    }
    throw new HttpError(409,'Another update is in progress. Please retry.');
  }
  async function rate(key: string, max: number, windowMs=60000) {
    await change(`limits/${key}`,()=>({start:now(),count:0}),d=>{if(now()-d.start>=windowMs){d.start=now();d.count=0;}if(++d.count>max)throw new HttpError(429,'Too many requests. Please try again later.');});
  }
  function audit(a: any, action: string, resource: string) { a.audit.push({id:randomUUID(),action,resource,at:new Date(now()).toISOString()}); a.audit=a.audit.slice(-500); }
  async function account(accountId: string) { const found=await storage.read(`accounts/${accountId}`);if(!found)throw new HttpError(401,'Sign in again.');return found.data; }
  async function sessionResponse(accountId: string, email: string, method: string) {
    await change(`accounts/${accountId}`,()=>({id:accountId,email,createdAt:new Date(now()).toISOString(),sites:[],sources:[],keys:[],events:[],requests:[],audit:[],operations:[]}),a=>{audit(a,'account.signin',method);});
    const token=secret(), csrf=secret();
    if(!await storage.write(`sessions/${digest(token)}`,{accountId,email,csrf,expires:now()+12*3600000,revoked:false},null))throw new HttpError(503,'Please try signing in again.');
    return new Response(JSON.stringify({signed_in:true,csrf,account:{id:accountId,email},access:'owner'}),{status:200,headers:{'Content-Type':'application/json','Set-Cookie':cookie('__Host-eb-session',token,43200)}});
  }
  async function auth(req: Request) {
    const value=cookies(req)['__Host-eb-session'];if(!value || value.length>100)throw new HttpError(401,'Please sign in.');
    const record=await storage.read(`sessions/${digest(value)}`), s=record?.data;
    if(!s || s.revoked || s.expires<=now())throw new HttpError(401,'Your session has ended. Please sign in again.');
    if(req.method!=='GET' && !equal(req.headers.get('x-csrf-token') || '',s.csrf))throw new HttpError(403,'Refresh the page and try again.');
    return {...s,key:`sessions/${digest(value)}`};
  }
  async function command(aid: string, request: Request, name: string, body: any, fn: (a: any) => any) {
    const key=text(request.headers.get('idempotency-key'),'Idempotency-Key',100), fp=digest(canonical(body));
    return change(`accounts/${aid}`,()=>{throw new HttpError(401,'Please sign in.');},a=>{
      const previous=a.operations.find((o:any)=>o.key===key && o.name===name);
      if(previous){if(previous.fp!==fp)throw new HttpError(409,'This request key has already been used for another change.');return previous.result;}
      const result=fn(a);a.operations=a.operations.filter((o:any)=>now()-o.at<72*3600000);
      if(a.operations.length>=1000)throw new HttpError(429,'Account update limit reached.');
      a.operations.push({key,name,fp,result,at:now()});return result;
    });
  }
  function view(a: any) {
    return {account:{id:a.id,email:a.email},sites:a.sites,sources:a.sources.map((s:any)=>({...s,status:s.lastSeen===null?'awaiting_events':now()-s.lastSeen>900000?'stale':'receiving_events'})),events:[...a.events].reverse(),keys:a.keys.map(({hash,...k}:any)=>k),requests:a.requests,usage:{sites:a.sites.length,sources:a.sources.length,events:a.events.length,event_limit:1000,amount_due_minor:0,currency:'ZAR',plan:'No paid subscription'},audit:[...a.audit].reverse(),capabilities:{metadata_events:true,camera_video:false,ai_detection:false,armed_response:false,payments:false,partner_delegation:false}};
  }
  async function handle(req: Request, clientIp: string) {
    const url=new URL(req.url), path=url.pathname;
    if(url.origin!==settings.origin)throw new HttpError(403,'Use the Edgebox site URL.');
    const from=req.headers.get('origin');
    const isKeyEvent=path==='/api/v1/events' && req.method==='POST' && /^Bearer eb_/.test(req.headers.get('authorization') || '');
    if(from && from!==settings.origin)throw new HttpError(403,'Cross-site requests are not accepted.');
    if(!['GET','HEAD'].includes(req.method) && !isKeyEvent && from!==settings.origin)throw new HttpError(403,'A same-site request is required.');
    const ok=(value:any,status=200)=>Response.json(value,{status});
    if(req.method==='GET' && path==='/api/v1/health')return ok({service:'edgebox-api',status:'ok',version:'1.0.0',google_configured:Boolean(settings.googleClientId),payments_enabled:false});
    if(req.method==='GET' && path==='/api/v1/auth/config')return ok({google_client_id:settings.googleClientId || null,google_enabled:Boolean(settings.googleClientId),access:'owner',account_signup:false});
    // A global bucket bounds unauthenticated cost even when a caller rotates IPs.
    if(path.startsWith('/api/v1/auth/') && path!=='/api/v1/auth/session' && path!=='/api/v1/auth/logout') {
      await rate('auth-global',120);await rate(`auth-${digest(clientIp || 'unknown')}`,15);
    }
    if(req.method==='POST' && path==='/api/v1/auth/challenge'){
      if(!settings.googleClientId)throw new HttpError(503,'Google sign-in is not configured.');
      await json(req);const nonce=secret();await storage.write(`challenges/${digest(nonce)}`,{expires:now()+600000,used:false},null);
      return new Response(JSON.stringify({nonce}),{headers:{'Content-Type':'application/json','Set-Cookie':cookie('__Host-eb-login',nonce,600)}});
    }
    if(req.method==='POST' && path==='/api/v1/auth/google'){
      if(!settings.googleClientId)throw new HttpError(503,'Google sign-in is not configured.');
      const body=await json(req), proof=cookies(req)['__Host-eb-login']; if(!proof)throw new HttpError(401,'Start sign-in again.');
      let claims:any;try{claims=await verifyGoogle(text(body.credential,'Google credential',12000));}catch{throw new HttpError(401,'Google could not verify this sign-in.');}
      if(!['https://accounts.google.com','accounts.google.com'].includes(claims?.iss) || claims.aud!==settings.googleClientId || claims.exp*1000<=now() || !Number.isFinite(claims.exp) || !claims.sub || claims.email_verified!==true || !equal(claims.nonce || '',proof))throw new HttpError(401,'Invalid Google sign-in.');
      if(claims.email?.toLowerCase()!==settings.ownerEmail.toLowerCase())throw new HttpError(403,'This account has not been given access.');
      await change(`challenges/${digest(proof)}`,()=>{throw new HttpError(401,'Sign-in expired.');},d=>{if(d.used || d.expires<=now())throw new HttpError(401,'Start sign-in again.');d.used=true;});
      return sessionResponse(digest(`owner:${settings.ownerEmail.toLowerCase()}`),settings.ownerEmail,'google');
    }
    if(req.method==='POST' && path==='/api/v1/auth/owner'){
      const body=await json(req), value=text(body.code,'access link',100);
      if(!settings.ownerCodeHash || !settings.ownerCodeExpires || settings.ownerCodeExpires<=now() || !equal(digest(value),settings.ownerCodeHash))throw new HttpError(401,'This access link is invalid or has expired.');
      await change(`owner-links/${settings.ownerCodeHash}`,()=>({used:false}),d=>{if(d.used)throw new HttpError(401,'This access link has already been used.');d.used=true;d.usedAt=now();});
      return sessionResponse(digest(`owner:${settings.ownerEmail.toLowerCase()}`),settings.ownerEmail,'owner-link');
    }
    if(isKeyEvent){
      const bearer=req.headers.get('authorization')!.slice(7); if(bearer.length>160)throw new HttpError(401,'Invalid API key.');
      const keyid=bearer.split('.')[0].slice(3);if(!/^[a-f0-9]{32}$/.test(keyid))throw new HttpError(401,'Invalid API key.');
      const index=await storage.read(`keys/${keyid}`); if(!index)throw new HttpError(401,'Invalid API key.');
      await rate(`key-${keyid}`,60);const body=await json(req);
      const allowed=['event_id','event_type','occurred_at','duration_seconds'];if(Object.keys(body).some(k=>!allowed.includes(k)))throw new HttpError(400,'Send event metadata only. Images, URLs and credentials are not accepted.');
      const eventId=id(body.event_id), occurred=utc(body.occurred_at,now());
      if(!['connection.test','camera.online','camera.offline','person.detected','vehicle.detected','queue.dwell.exceeded'].includes(body.event_type))throw new HttpError(400,'Unsupported event type.');
      if(body.duration_seconds!==undefined && (!Number.isSafeInteger(body.duration_seconds) || body.duration_seconds<0 || body.duration_seconds>604800))throw new HttpError(400,'Invalid duration.');
      const data={event_id:eventId,event_type:body.event_type,occurred_at:occurred,...(body.duration_seconds===undefined?{}:{duration_seconds:body.duration_seconds})}, fp=digest(canonical(data));
      return ok(await change(`accounts/${index.data.accountId}`,()=>{throw new HttpError(401,'Invalid API key.');},a=>{
        const key=a.keys.find((k:any)=>k.id===keyid);if(!key || key.revoked || key.expires<=now() || !equal(digest(bearer),key.hash))throw new HttpError(401,'API key expired or revoked.');
        const source=a.sources.find((s:any)=>s.id===key.sourceId);if(!source)throw new HttpError(401,'Source no longer exists.');
        const old=a.events.find((e:any)=>e.id===eventId && e.sourceId===source.id);if(old){if(old.fingerprint!==fp)throw new HttpError(409,'Event ID already has different data.');return {accepted:false,duplicate:true,id:eventId};}
        if(a.events.length>=1000)throw new HttpError(429,'Event storage limit reached. Export records and contact support.');
        a.events.push({id:eventId,sourceId:source.id,siteId:source.siteId,...data,fingerprint:fp,receivedAt:new Date(now()).toISOString(),acknowledgedAt:null,origin:'external_api'});source.lastSeen=now();audit(a,'event.received',eventId);return {accepted:true,duplicate:false,id:eventId};
      }));
    }
    const s=await auth(req); await rate(`account-${s.accountId}`,120);
    if(req.method==='GET' && path==='/api/v1/auth/session')return ok({signed_in:true,csrf:s.csrf,account:{id:s.accountId,email:s.email}});
    if(req.method==='POST' && path==='/api/v1/auth/logout'){
      await json(req);await change(s.key,()=>({}),d=>{d.revoked=true;});return new Response(JSON.stringify({signed_in:false}),{headers:{'Content-Type':'application/json','Set-Cookie':cookie('__Host-eb-session','',0)}});
    }
    if(req.method==='GET' && path==='/api/v1/dashboard')return ok(view(await account(s.accountId)));
    if(req.method==='GET' && path==='/api/v1/export')return ok({exported_at:new Date(now()).toISOString(),...view(await account(s.accountId))});
    if(req.method==='POST' && path==='/api/v1/sites'){
      const body=await json(req), name=text(body.name,'site name'); if(!['home','business'].includes(body.kind))throw new HttpError(400,'Choose home or business.');
      return ok(await command(s.accountId,req,'site.create',{name,kind:body.kind},a=>{if(a.sites.length>=20)throw new HttpError(409,'Site limit reached.');const site={id:randomUUID(),name,kind:body.kind,createdAt:new Date(now()).toISOString()};a.sites.push(site);audit(a,'site.created',site.id);return site;}),201);
    }
    if(req.method==='POST' && path==='/api/v1/sources'){
      const body=await json(req), name=text(body.name,'source name'),siteId=id(body.site_id),brand=text(body.brand || 'Other','brand',80);
      return ok(await command(s.accountId,req,'source.create',{name,siteId,brand},a=>{if(!a.sites.some((v:any)=>v.id===siteId))throw new HttpError(404,'Site not found.');if(a.sources.length>=100)throw new HttpError(409,'Source limit reached.');const source={id:randomUUID(),siteId,name,brand,lastSeen:null,createdAt:new Date(now()).toISOString()};a.sources.push(source);audit(a,'source.created',source.id);return source;}),201);
    }
    if(req.method==='POST' && path==='/api/v1/api-keys'){
      const body=await json(req), sourceId=id(body.source_id), keyId=randomUUID().replaceAll('-',''), value=`eb_${keyId}.${secret()}`;
      const record=await change(`accounts/${s.accountId}`,()=>{throw new HttpError(401,'Please sign in.');},a=>{if(!a.sources.some((v:any)=>v.id===sourceId))throw new HttpError(404,'Source not found.');if(a.keys.length>=100 || a.keys.filter((v:any)=>!v.revoked && v.expires>now()).length>=20)throw new HttpError(409,'Key limit reached. Revoke unused keys or contact support.');const key={id:keyId,sourceId,hash:digest(value),createdAt:new Date(now()).toISOString(),expires:now()+30*86400000,revoked:false};a.keys.push(key);audit(a,'key.created',keyId);return {id:keyId,expires:key.expires};});
      if(!await storage.write(`keys/${keyId}`,{accountId:s.accountId},null))throw new HttpError(503,'Key registration failed. Revoke it and retry.');
      return ok({...record,api_key:value,shown_once:true},201);
    }
    const revoke=path.match(/^\/api\/v1\/api-keys\/([a-f0-9]{32})\/revoke$/);
    if(req.method==='POST' && revoke){await json(req);return ok(await change(`accounts/${s.accountId}`,()=>{throw new HttpError(401,'Please sign in.');},a=>{const key=a.keys.find((k:any)=>k.id===revoke[1]);if(!key)throw new HttpError(404,'Key not found.');key.revoked=true;audit(a,'key.revoked',key.id);return {revoked:true};}));}
    const ack=path.match(/^\/api\/v1\/events\/([A-Za-z0-9_-]+)\/acknowledge$/);
    if(req.method==='POST' && ack){const body=await json(req), sourceId=id(body.source_id);return ok(await command(s.accountId,req,'event.ack',{id:ack[1],sourceId},a=>{const e=a.events.find((v:any)=>v.id===ack[1] && v.sourceId===sourceId);if(!e)throw new HttpError(404,'Event not found.');e.acknowledgedAt ||= new Date(now()).toISOString();audit(a,'event.acknowledged',e.id);return {id:e.id,acknowledged_at:e.acknowledgedAt};}));}
    if(req.method==='POST' && path==='/api/v1/service-requests'){
      const body=await json(req), siteId=id(body.site_id);if(!['camera-connection','partner-platform','operations','account-deletion'].includes(body.service))throw new HttpError(400,'Choose a service.');
      return ok(await command(s.accountId,req,'service.request',{siteId,service:body.service},a=>{if(!a.sites.some((v:any)=>v.id===siteId))throw new HttpError(404,'Site not found.');if(a.requests.length>=50)throw new HttpError(409,'Request limit reached.');const item={id:randomUUID(),siteId,service:body.service,status:'received',createdAt:new Date(now()).toISOString()};a.requests.push(item);audit(a,'service.requested',item.id);return item;}),201);
    }
    throw new HttpError(404,'Endpoint not found.');
  }
  return async (req: Request, clientIp='unknown') => {
    const requestId=randomUUID();let response:Response;
    try{response=await handle(req,clientIp);}catch(error){response=Response.json({error:error instanceof HttpError?error.message:'Service unavailable. Please try again.',request_id:requestId},{status:error instanceof HttpError?error.status:503});}
    response.headers.set('Cache-Control','no-store');response.headers.set('X-Request-ID',requestId);response.headers.set('X-Content-Type-Options','nosniff');response.headers.set('Referrer-Policy','no-referrer');return response;
  };
}
