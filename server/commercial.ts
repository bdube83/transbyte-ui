/** Edgebox founder sales operations. Recordkeeping only: no sending, invoicing or money movement. */
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import type { Storage } from './app.ts';

type RecordData = Record<string, any>;
export type CommercialState = { version: number; revision: number; accounts: RecordData[]; deals: RecordData[]; tenders: RecordData[]; audit: RecordData[]; operations: RecordData[] };
export class CommercialError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
function fail(message: string, status = 400): never { throw new CommercialError(status, message); }
const str = (v: any, label: string, max = 300): string => typeof v === 'string' && v.trim() && v.length <= max ? v.trim() : fail(`Check ${label}.`);
const number = (v: any, label: string, max = 100000000000): number => Number.isSafeInteger(v) && v >= 0 && v <= max ? v : fail(`Check ${label}.`);
const choice = (v: any, values: string[], label: string): string => values.includes(v) ? v : fail(`Choose ${label}.`);
const date = (v: any, label: string): string => {
  const s = str(v, label, 24), d = new Date(s);
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(s) || !Number.isFinite(d.getTime()) || d.toISOString().slice(0,19) !== s.slice(0,19)) fail(`Use a valid UTC date for ${label}.`);
  return d.toISOString();
};
const ref = (v: any, label = 'evidence reference'): string => {
  const s = str(v, label, 500);
  if (/^[A-Za-z][A-Za-z0-9_.:/-]{2,180}$/.test(s) && !s.includes('://')) return s;
  try { const u = new URL(s); if(u.protocol === 'https:' && !u.username && !u.password && !u.search && !u.hash) return u.href; } catch {}
  return fail(`Use a private document ID or clean HTTPS link for ${label}; never paste secrets.`);
};
const canonical = (v: any): string => Array.isArray(v) ? `[${v.map(canonical)}]` : v !== null && typeof v === 'object' ? `{${Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')}}` : JSON.stringify(v);
const hash = (v: string) => createHash('sha256').update(v).digest('hex');
const equal = (a: string, b: string) => timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b)));
const nowISO = (now: number) => new Date(now).toISOString();
export const initialCommercialState = (): CommercialState => ({version:1,revision:0,accounts:[],deals:[],tenders:[],audit:[],operations:[]});
const find = (rows: RecordData[], id: any, label: string): RecordData => rows.find(x=>x.id===id) || fail(`${label} not found.`,404);
const accountFor = (s: CommercialState, d: RecordData) => find(s.accounts,d.accountId,'Account');
const canContact = (a: RecordData) => ['consented','existing_relationship'].includes(a.permission);
const assertContact = (a: RecordData) => { if(!canContact(a))fail('Record an authorised contact route before progressing this sale.',409); };
const mutable = (d: RecordData) => { if(['live','ended','lost'].includes(d.stage))fail('This deal is closed to sales-stage edits.',409); };
const latestQuote = (d: RecordData) => d.quotes.at(-1);
const netServices = (d: RecordData) => d.receipts.reduce((total: number,r: RecordData)=>total+(r.category==='service' ? r.netMinor*(r.kind==='refund'?-1:1):0),0);

export function quoteTotals(lines: any): { lines: RecordData[]; onceMinor: number; monthlyMinor: number } {
  if(!Array.isArray(lines) || !lines.length || lines.length>12)fail('Add 1–12 quote lines.');
  let onceMinor=0,monthlyMinor=0;
  const clean = lines.map((l: any)=>{
    if(!l || typeof l!=='object')fail('Invalid quote line.');
    const label=str(l.label,'line description',100),quantity=number(l.quantity,'quantity',1000000),unitMinor=number(l.unitMinor,'unit price',1000000000);
    if(quantity<1)fail('Quantity must be at least one.');
    const cadence=choice(l.cadence,['once','monthly','annual'],'billing frequency');
    const value=BigInt(quantity)*BigInt(unitMinor);
    if(value>100000000000n)fail('Quote exceeds the supported value.');
    const totalMinor=Number(value);
    if(cadence==='once')onceMinor+=totalMinor;
    else monthlyMinor+=cadence==='monthly'?totalMinor:Number((value+6n)/12n);
    return {label,quantity,unitMinor,cadence,totalMinor};
  });
  number(onceMinor,'one-off total'); number(monthlyMinor,'monthly total');
  if(!onceMinor && !monthlyMinor)fail('A quote must have a positive amount.');
  return {lines:clean,onceMinor,monthlyMinor};
}

export function tenderRoute(t: RecordData, now: number): string {
  if(Date.parse(t.closesAt)<=now)return 'closed';
  if(t.briefingAt && Date.parse(t.briefingAt)<now && !t.briefingAttended)return 'missed_briefing';
  if(t.gates.some((g: RecordData)=>g.status==='fail'))return 'not_eligible';
  if(!t.gates.length || t.gates.some((g: RecordData)=>g.status==='unknown'))return 'check_requirements';
  if(t.partnerRequired && !t.partnerRef)return 'partner_needed';
  return 'review_before_bid';
}

/** Pure command handler; all validation occurs before a successful compare-and-set write. */
export function applyCommercial(s: CommercialState, command: RecordData, actor: string, now: number): RecordData {
  const {type,payload:p}=command;
  if(!p || typeof p!=='object' || Array.isArray(p))fail('Command payload required.');
  const stamp=nowISO(now);let result:RecordData;
  if(type==='account.create'){
    if(s.accounts.length>=500)fail('500-account capacity reached. Export and provision the next storage tier.',409);
    const name=str(p.name,'account name',120),sourceRef=ref(p.sourceRef,'research source'),kind=choice(p.kind,['security_partner','operations','home','business'],'account type');
    let domain='';
    if(p.domain){try{const u=new URL(p.domain.includes('://')?p.domain:`https://${p.domain}`);if(u.protocol!=='https:' || u.username || u.password)throw 0;domain=u.hostname.toLowerCase().replace(/^www\./,'');}catch{fail('Use a valid company website.');}}
    if(s.accounts.some(a=>(domain && a.domain===domain)||a.name.toLowerCase()===name.toLowerCase()))fail('This account is already in the pipeline.',409);
    if(p.testRecord!==undefined && typeof p.testRecord!=='boolean')fail('Invalid test-record flag.');
    result={id:randomUUID(),name,domain,kind,sourceRef,testRecord:p.testRecord===true,permission:'research_only',permissionRef:null,createdAt:stamp};s.accounts.push(result);
  } else if(type==='account.permission'){
    const a=find(s.accounts,p.id,'Account'),permission=choice(p.permission,['research_only','consented','existing_relationship','do_not_contact'],'contact permission');
    const evidenceRef=ref(p.evidenceRef,'permission evidence');
    a.permission=permission;a.permissionRef=evidenceRef;a.permissionAt=stamp;result={id:a.id,permission};
  } else if(type==='deal.create'){
    if(s.deals.length>=1000)fail('Deal capacity reached. Export and provision the next storage tier.',409);
    const a=find(s.accounts,p.accountId,'Account');
    result={id:randomUUID(),accountId:a.id,title:str(p.title,'opportunity',160),lane:choice(p.lane,['partner','operations','home','business'],'sales route'),stage:'researched',owner:str(p.owner||'Bongani','owner',80),nextAction:str(p.nextAction,'next action',300),dueAt:date(p.dueAt,'next action date'),createdAt:stamp,updatedAt:stamp,qualification:null,quotes:[],contract:null,receipts:[],activation:null,blocker:null};s.deals.push(result);
  } else if(type.startsWith('deal.') || ['quote.create','contract.record','receipt.record','receipt.refund','activation.record','service.end'].includes(type)){
    const d=find(s.deals,p.id,'Opportunity'),a=accountFor(s,d);d.updatedAt=stamp;
    if(type==='deal.next_action'){
      d.nextAction=str(p.nextAction,'next action');d.dueAt=date(p.dueAt,'next action date');d.owner=str(p.owner||d.owner,'owner',80);result={id:d.id};
    } else if(type==='deal.blocker'){
      d.blocker=p.reason?{reason:str(p.reason,'blocker',300),humanOnly:p.humanOnly===true,ref:ref(p.evidenceRef),at:stamp}:null;result={id:d.id,blocker:d.blocker};
    } else if(type==='deal.qualify'){
      mutable(d);if(d.stage!=='researched')fail('Only a researched opportunity can be qualified.',409);assertContact(a);
      d.qualification={buyerRole:str(p.buyerRole,'economic buyer role',100),problem:str(p.problem,'customer problem',500),evidenceRef:ref(p.evidenceRef),at:stamp};d.stage='qualified';result={id:d.id,stage:d.stage};
    } else if(type==='quote.create'){
      mutable(d);if(!['qualified','proposal'].includes(d.stage))fail('Qualify the buyer and problem first.',409);assertContact(a);
      if(d.quotes.length>=20)fail('Quote version limit reached.',409);
      const totals=quoteTotals(p.lines),expiresAt=date(p.expiresAt,'quote expiry');if(Date.parse(expiresAt)<=now)fail('Quote expiry must be in the future.');
      const directCostMinor=number(p.directCostMinor,'estimated monthly delivery cost'),channelCostMinor=number(p.channelCostMinor,'monthly channel cost');
      const contributionMinor=totals.monthlyMinor-directCostMinor-channelCostMinor;
      const exceptions=contributionMinor<0?ref(p.exceptionRef,'negative-margin exception evidence'):null;
      result={id:randomUUID(),version:d.quotes.length+1,createdAt:stamp,expiresAt,...totals,directCostMinor,channelCostMinor,contributionMinor,exceptionRef:exceptions,currency:'ZAR',tax:'excluded; not a tax invoice',scope:str(p.scope,'delivery scope',1000),status:'draft_not_sent'};
      d.quotes.push(result);d.stage='proposal';
    } else if(type==='contract.record'){
      if(d.stage!=='proposal')fail('Prepare a quote first.',409);assertContact(a);
      const q=latestQuote(d);if(q.id!==p.quoteId)fail('Accept the latest quote version.',409);if(Date.parse(q.expiresAt)<=now)fail('Quote expired. Prepare a new version.',409);
      d.contract={quoteId:q.id,evidenceRef:ref(p.evidenceRef,'signed agreement'),recordedAt:stamp,attestation:'operator_recorded'};d.stage='contracted';result={id:d.id,stage:d.stage};
    } else if(type==='receipt.record'){
      if(!d.contract)fail('Record a signed agreement before its receipts.',409);
      const reference=str(p.reference,'bank or provider reference',120);if(s.deals.some(x=>x.receipts.some((r:RecordData)=>r.reference===reference)))fail('This payment reference has already been recorded.',409);
      const grossMinor=number(p.grossMinor,'gross amount'),taxMinor=number(p.taxMinor,'tax amount');if(grossMinor<1 || taxMinor>grossMinor)fail('Invalid receipt amount.');
      const paidAt=date(p.paidAt,'payment date');if(Date.parse(paidAt)>now)fail('A future payment cannot be recorded as collected.');
      result={id:randomUUID(),reference,kind:'receipt',grossMinor,taxMinor,netMinor:grossMinor-taxMinor,category:choice(p.category,['service','deposit','hardware','pass_through'],'receipt category'),paidAt,evidenceRef:ref(p.evidenceRef,'settlement evidence'),recordedAt:stamp,recordedBy:actor,verification:'operator_recorded_not_bank_synced'};d.receipts.push(result);
    } else if(type==='receipt.refund'){
      const original=find(d.receipts,p.receiptId,'Receipt');if(original.kind!=='receipt')fail('Select an original receipt.');
      const reference=str(p.reference,'refund settlement reference',120);if(s.deals.some(x=>x.receipts.some((r:RecordData)=>r.reference===reference)))fail('This payment reference already exists.',409);
      const grossMinor=number(p.grossMinor,'refund amount'),taxMinor=number(p.taxMinor,'refund tax');const prior=d.receipts.filter((r:RecordData)=>r.reverses===original.id);
      if(grossMinor<1 || taxMinor>grossMinor || prior.reduce((n:number,r:RecordData)=>n+r.grossMinor,0)+grossMinor>original.grossMinor || prior.reduce((n:number,r:RecordData)=>n+r.taxMinor,0)+taxMinor>original.taxMinor || prior.reduce((n:number,r:RecordData)=>n+r.netMinor,0)+grossMinor-taxMinor>original.netMinor)fail('Refund exceeds the original receipt.');
      const paidAt=date(p.paidAt,'refund date');if(Date.parse(paidAt)>now || Date.parse(paidAt)<Date.parse(original.paidAt))fail('Invalid refund date.');
      result={id:randomUUID(),reference,kind:'refund',reverses:original.id,grossMinor,taxMinor,netMinor:grossMinor-taxMinor,category:original.category,paidAt,evidenceRef:ref(p.evidenceRef),recordedAt:stamp,recordedBy:actor,verification:'operator_recorded_not_bank_synced'};d.receipts.push(result);
    } else if(type==='activation.record'){
      if(d.stage!=='contracted' || !d.contract)fail('Record an agreement before activating.',409);
      if(netServices(d)<=0)fail('Record a settled service receipt. A deposit or hardware receipt does not activate service MRR.',409);
      const siteRefs=Array.isArray(p.siteRefs)?p.siteRefs.map((x:any)=>str(x,'commissioned site reference',120)):[];
      if(!siteRefs.length || siteRefs.length>100 || new Set(siteRefs).size!==siteRefs.length)fail('Supply 1–100 unique site references.');
      if(s.deals.some(x=>x.stage==='live' && x.activation.siteRefs.some((r:string)=>siteRefs.includes(r))))fail('A site is already attributed to another live contract.',409);
      const startedAt=date(p.startedAt,'activation date'),renewalAt=date(p.renewalAt,'renewal date');if(Date.parse(startedAt)>now || Date.parse(renewalAt)<=now)fail('Activation must be current; renewal must be future.');
      const q=latestQuote(d);d.activation={siteRefs,startedAt,renewalAt,acceptanceRef:ref(p.acceptanceRef,'buyer acceptance'),commissioningRef:ref(p.commissioningRef,'commissioning evidence'),monthlyMinor:q.monthlyMinor,endedAt:null};d.stage='live';result={id:d.id,stage:d.stage};
    } else if(type==='service.end'){
      if(d.stage!=='live')fail('Only a live contract can end.',409);const endedAt=date(p.endedAt,'service end');if(Date.parse(endedAt)>now || Date.parse(endedAt)<Date.parse(d.activation.startedAt))fail('Invalid service-end date.');
      d.activation.endedAt=endedAt;d.stage='ended';d.endReason=str(p.reason,'cancellation reason');d.endRef=ref(p.evidenceRef);result={id:d.id,stage:d.stage};
    } else if(type==='deal.lose'){
      mutable(d);d.stage='lost';d.lossReason=str(p.reason,'loss reason');result={id:d.id,stage:d.stage};
    } else fail('Unknown deal command.');
  } else if(type==='tender.record'){
    if(s.tenders.length>=200)fail('Procurement record limit reached.',409);
    const sourceRef=ref(p.sourceRef,'official tender source'),reference=str(p.reference,'tender reference',120);
    if(s.tenders.some(t=>t.reference===reference && t.buyer===p.buyer))fail('Tender already recorded. Update its review instead.',409);
    result={id:randomUUID(),reference,buyer:str(p.buyer,'buyer',120),sourceRef,closesAt:date(p.closesAt,'closing date'),briefingAt:p.briefingAt?date(p.briefingAt,'briefing date'):null,briefingAttended:false,partnerRequired:p.partnerRequired===true,partnerRef:null,gates:[],reviewedAt:stamp};s.tenders.push(result);
  } else if(type==='tender.review'){
    const t=find(s.tenders,p.id,'Tender');if(!Array.isArray(p.gates) || p.gates.length>30)fail('Add up to 30 requirements.');
    t.gates=p.gates.map((g:any)=>({name:str(g.name,'requirement',160),status:choice(g.status,['pass','fail','unknown'],'requirement result'),evidenceRef:g.status==='unknown'?null:ref(g.evidenceRef)}));
    t.briefingAttended=p.briefingAttended===true;if(t.briefingAttended)t.briefingEvidence=ref(p.briefingEvidence);
    t.partnerRef=p.partnerRef?ref(p.partnerRef):null;t.reviewedAt=stamp;result={id:t.id,route:tenderRoute(t,now)};
  } else fail('Unknown commercial command.');
  s.revision++;s.audit.push({id:randomUUID(),command:type,resourceId:result.id,actor,at:stamp});return result;
}

export function commercialView(s: CommercialState, now: number) {
  const live=s.deals.filter(d=>d.stage==='live' && !accountFor(s,d).testRecord && netServices(d)>0 && Date.parse(d.activation.renewalAt)>now);
  const qualified=s.deals.filter(d=>['qualified','proposal','contracted'].includes(d.stage) && !accountFor(s,d).testRecord);
  const records=s.deals.filter(d=>!accountFor(s,d).testRecord).flatMap(d=>d.receipts);
  const cashMinor=records.reduce((n,r)=>n+(r.kind==='refund'?-1:1)*r.grossMinor,0);
  const serviceCashMinor=records.filter(r=>r.category==='service').reduce((n,r)=>n+(r.kind==='refund'?-1:1)*r.netMinor,0);
  const mrrMinor=live.reduce((n,d)=>n+d.activation.monthlyMinor,0);
  const actions:RecordData[]=[];
  for(const d of s.deals){const a=accountFor(s,d);if(a.testRecord || ['lost','ended'].includes(d.stage))continue;
    if(d.blocker)actions.push({id:`blocker:${d.id}`,dealId:d.id,account:a.name,title:d.blocker.reason,priority:1,kind:d.blocker.humanOnly?'human_action':'blocker',dueAt:d.blocker.at});
    if(d.stage==='live'){
      if(netServices(d)<=0)actions.push({id:`receipt:${d.id}`,dealId:d.id,account:a.name,title:'Service receipts were fully reversed; review the subscription.',priority:1,kind:'reconciliation',dueAt:d.updatedAt});
      if(Date.parse(d.activation.renewalAt)<=now+14*86400000)actions.push({id:`renew:${d.id}`,dealId:d.id,account:a.name,title:'Confirm renewal and record the next agreement.',priority:2,kind:'renewal',dueAt:d.activation.renewalAt});
    }else if(Date.parse(d.dueAt)<=now || now-Date.parse(d.updatedAt)>7*86400000){actions.push({id:`next:${d.id}`,dealId:d.id,account:a.name,title:a.permission==='do_not_contact'?'Do not contact: review or close this opportunity.':d.nextAction,priority:3,kind:a.permission==='do_not_contact'?'contact_hold':'next_action',dueAt:d.dueAt});}
    if(d.stage==='proposal' && Date.parse(latestQuote(d).expiresAt)<=now)actions.push({id:`quote:${d.id}`,dealId:d.id,account:a.name,title:'Quote expired. Reprice before accepting.',priority:2,kind:'expired_quote',dueAt:latestQuote(d).expiresAt});
  }
  for(const t of s.tenders){if(Date.parse(t.closesAt)>now && Date.parse(t.closesAt)<now+7*86400000)actions.push({id:`tender:${t.id}`,account:t.buyer,title:`${t.reference}: ${tenderRoute(t,now).replaceAll('_',' ')}`,priority:2,kind:'procurement',dueAt:t.closesAt});}
  return {version:s.version,revision:s.revision,asOf:nowISO(now),currency:'ZAR',basis:'Operator-recorded evidence; not bank-synchronised or an accounting ledger.',accounts:s.accounts,deals:s.deals,tenders:s.tenders.map(t=>({...t,route:tenderRoute(t,now)})),actions:actions.sort((a,b)=>a.priority-b.priority || a.dueAt.localeCompare(b.dueAt)),metrics:{recordedCashMinor:cashMinor,recordedServiceCashMinor:serviceCashMinor,activatedMrrMinor:mrrMinor,qualifiedPipelineMrrMinor:qualified.reduce((n,d)=>n+(latestQuote(d)?.monthlyMinor||0),0),productivePartners:new Set(live.filter(d=>d.lane==='partner').map(d=>d.accountId)).size,activatedSites:live.reduce((n,d)=>n+d.activation.siteRefs.length,0),targetMrrMinor:10000000000,nextGateMinor:[10000000,100000000,1000000000,10000000000].find(g=>mrrMinor<g)||10000000000},audit:s.audit.slice(-100).reverse(),integrations:{outboundEmail:false,bankSync:false,automaticCheckout:false,automaticCameraCommissioning:false,automaticTenderSubmission:false}};
}

/** Keep authentication in the existing application, not in another identity implementation. */
export function commercialAccess(base: (req: Request,ip?: string)=>Promise<Response>) {
  return async (req: Request,ip: string) => {
    const headers=new Headers(req.headers);headers.delete('content-type');headers.delete('content-length');
    const request=(path:string)=>new Request(new URL(path,req.url),{headers,method:'GET'});
    const sessionResponse=await base(request('/api/v1/auth/session'),ip);if(!sessionResponse.ok)fail('Sign in to Edgebox.',sessionResponse.status===401?401:503);
    const session=await sessionResponse.json();
    const admin=await base(request('/api/v1/admin/orgs'),ip);if(!admin.ok)fail('This workspace is for authorised Edgebox sales operators.',admin.status===403?403:admin.status===401?401:503);
    if(req.method!=='GET' && (!session.csrf || !equal(req.headers.get('x-csrf-token')||'',session.csrf)))fail('Refresh the page and try again.',403);
    return str(session.account?.id,'operator identity',120);
  };
}
export function commercialApplication({storage,origin,authorize,now=Date.now}:{storage:Storage;origin:string;authorize:(req:Request,ip:string)=>Promise<string>;now?:()=>number}) {
  return async (req:Request,ip='unknown'):Promise<Response>=>{
    const requestId=randomUUID(),headers={'Cache-Control':'no-store','X-Request-ID':requestId,'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
    try{
      const url=new URL(req.url);
      if(url.origin!==origin || (req.headers.has('origin') && req.headers.get('origin')!==origin) || (req.method!=='GET' && req.headers.get('origin')!==origin))fail('Use the Edgebox website.',403);
      const actor=await authorize(req,ip),key='commercial/v1/operations';
      if(req.method==='GET' && ['/api/v1/commercial','/api/v1/commercial/export'].includes(url.pathname)){
        const state=(await storage.read(key))?.data||initialCommercialState();
        return Response.json(url.pathname.endsWith('/export')?{exportedAt:nowISO(now()),...state,operations:undefined}:commercialView(state,now()),{headers});
      }
      if(req.method!=='POST' || url.pathname!=='/api/v1/commercial/commands')fail('Endpoint not found.',404);
      if(!req.headers.get('content-type')?.startsWith('application/json'))fail('Send JSON.',415);
      const reader=req.body?.getReader();if(!reader)fail('JSON required.');let size=0;const chunks:Uint8Array[]=[];
      while(true){const chunk=await reader!.read();if(chunk.done)break;size+=chunk.value.byteLength;if(size>32768){await reader!.cancel();fail('Request too large.',413);}chunks.push(chunk.value);}
      let command:any;try{command=JSON.parse(Buffer.concat(chunks).toString());}catch{fail('Invalid JSON.');}
      if(!command || typeof command!=='object' || Array.isArray(command))fail('Command required.');
      number(command.revision,'workspace revision');str(command.type,'command type',80);
      const idempotency=str(req.headers.get('idempotency-key'),'request ID',100),fingerprint=hash(canonical(command));
      for(let attempt=0;attempt<5;attempt++){
        const old=await storage.read(key),state:CommercialState=structuredClone(old?.data||initialCommercialState());
        if(state.version!==1)fail('Unsupported workspace version.',409);
        const previous=state.operations.find(x=>x.actor===actor && x.key===idempotency);
        if(previous){if(previous.fingerprint!==fingerprint)fail('Request ID already used for different data.',409);return Response.json({...previous.result,replayed:true},{headers});}
        if(state.revision!==command.revision)fail('The workspace changed. Refresh before saving.',409);
        if(state.operations.length>=5000 || state.audit.length>=5000)fail('Workspace audit capacity reached. Export and contact the administrator.',409);
        const result=applyCommercial(state,command,actor,now());
        state.operations.push({actor,key:idempotency,fingerprint,result:{result,revision:state.revision}});
        if(Buffer.byteLength(JSON.stringify(state))>4000000)fail('Workspace capacity reached. Export before expanding.',409);
        if(await storage.write(key,state,old?.etag??null))return Response.json({result,revision:state.revision},{status:201,headers});
      }
      fail('Concurrent update. Refresh and retry.',409);
    }catch(e){return Response.json({error:e instanceof CommercialError?e.message:'Commercial workspace unavailable. Please retry.',request_id:requestId},{status:e instanceof CommercialError?e.status:503,headers});}
  };
}
