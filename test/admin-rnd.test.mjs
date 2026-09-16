import test from 'node:test';
import assert from 'node:assert/strict';
import { scryptSync } from 'node:crypto';
import { application, totpCode } from '../server/app.ts';

class MemoryStorage {
  values=new Map(); revision=0;
  async read(key){const v=this.values.get(key);return v?structuredClone(v):null;}
  async write(key,data,etag){const old=this.values.get(key);if((old?.etag??null)!==etag)return false;this.values.set(key,{data:structuredClone(data),etag:String(++this.revision)});return true;}
}
const PASSWORD='correct horse battery staple', TOTP_SECRET='JBSWY3DPEHPK3PXP', SALT='a1b2c3d4e5f60718a1b2c3d4e5f60718';
const PASS_HASH=`${SALT}:${scryptSync(PASSWORD,Buffer.from(SALT,'hex'),64).toString('hex')}`;
function fixture(storage=new MemoryStorage(),admin={email:'info@Khuselaworkflow.com',passwordHash:PASS_HASH,totpSecret:TOTP_SECRET}){
  let time=Date.parse('2026-09-16T18:00:00Z');
  const settings={origin:'https://edgebox.africa',admin};
  const app=application({storage,settings,now:()=>time,verifyGoogle:async()=>{throw Error('no google');}});
  let cookie='',csrf='';
  const call=async(path,method='GET',body,extra={})=>{
    const r=await app(new Request(settings.origin+'/api/v1'+path,{method,headers:{Origin:settings.origin,Cookie:cookie,'Content-Type':'application/json','X-CSRF-Token':csrf,'Idempotency-Key':crypto.randomUUID(),...extra},...(body===undefined?{}:{body:JSON.stringify(body)})}),'127.0.0.1');
    return {status:r.status,data:await r.json(),response:r};
  };
  const login=async(over={})=>{const body={email:'info@khuselaworkflow.com',password:PASSWORD,otp:totpCode(TOTP_SECRET,time),...over};const r=await call('/admin/login','POST',body);if(r.status===200){cookie=r.response.headers.get('set-cookie').split(';')[0];csrf=r.data.csrf;}return r;};
  return {storage,settings,call,login,setTime:v=>time=v,getTime:()=>time};
}

test('admin login needs the exact email, password and current TOTP code',async()=>{
  const f=fixture();
  assert.equal((await f.login({password:'wrong'})).status,401);
  assert.equal((await f.login({otp:'000000'})).status,401);
  assert.equal((await f.login({email:'someone@else.com'})).status,401);
  const ok=await f.login(); assert.equal(ok.status,200); assert.equal(ok.data.operator.email,'info@khuselaworkflow.com');
  assert.match(ok.response.headers.get('set-cookie'),/__Host-eb-admin=.*Secure; HttpOnly; SameSite=Strict/);
});
test('a stale TOTP code from a past window is rejected',async()=>{
  const f=fixture(); const stale=totpCode(TOTP_SECRET,f.getTime()-120000); assert.equal((await f.login({otp:stale})).status,401);
});
test('admin login is unavailable when no credential is configured',async()=>{
  const f=fixture(new MemoryStorage(),null); assert.equal((await f.login()).status,503);
});
test('the admin session is required for the R&D board and reports the operator',async()=>{
  const f=fixture();
  assert.equal((await f.call('/admin/rnd')).status,401);
  assert.equal((await f.call('/admin/session')).status,401);
  await f.login();
  const s=await f.call('/admin/session'); assert.equal(s.status,200); assert.equal(s.data.admin,true); assert.equal(s.data.operator.email,'info@khuselaworkflow.com');
});
test('R&D board starts empty with the four revenue gates and five stages',async()=>{
  const f=fixture(); await f.login(); const b=(await f.call('/admin/rnd')).data;
  assert.deepEqual(b.stages,['idea','designed','running','measured','decided']);
  assert.equal(b.experiments.length,0);
  assert.equal(b.gates.targets.length,4);
  assert.equal(b.gates.targets[0].target_minor,10000000);
  assert.equal(b.gates.targets[3].target_minor,10000000000);
  assert.equal(b.gates.current_mrr_minor,0);
});
test('an experiment moves through stages, records a result and a decision, then is deleted',async()=>{
  const f=fixture(); await f.login();
  const created=await f.call('/admin/rnd/experiments','POST',{title:'Depot dwell-time pilot',hypothesis:'A depot will pay R25k to cut queue dwell exceptions',cheapest_test:'One paid 30-day pilot at one depot',cost_minor:2500000,gate:'r100k'});
  assert.equal(created.status,201); assert.equal(created.data.stage,'idea'); const id=created.data.id;
  assert.equal((await f.call(`/admin/rnd/experiments/${id}`,'POST',{stage:'running'})).data.stage,'running');
  const decided=await f.call(`/admin/rnd/experiments/${id}`,'POST',{stage:'decided',result:'Pilot signed, R25k invoiced',decision:'pursue'});
  assert.equal(decided.data.decision,'pursue'); assert.equal(decided.data.result,'Pilot signed, R25k invoiced');
  assert.equal((await f.call('/admin/rnd')).data.experiments.length,1);
  assert.equal((await f.call(`/admin/rnd/experiments/${id}/delete`,'POST',{})).status,200);
  assert.equal((await f.call('/admin/rnd')).data.experiments.length,0);
  assert.equal((await f.call(`/admin/rnd/experiments/${id}`,'POST',{stage:'idea'})).status,404);
});
test('invalid stage and decision values are rejected',async()=>{
  const f=fixture(); await f.login();
  const id=(await f.call('/admin/rnd/experiments','POST',{title:'X',hypothesis:'Y',cheapest_test:'Z'})).data.id;
  assert.equal((await f.call(`/admin/rnd/experiments/${id}`,'POST',{stage:'shipped'})).status,400);
  assert.equal((await f.call(`/admin/rnd/experiments/${id}`,'POST',{decision:'maybe'})).status,400);
});
test('current MRR is editable and framed against the gates',async()=>{
  const f=fixture(); await f.login();
  assert.equal((await f.call('/admin/rnd/gates','POST',{current_mrr_minor:15000000,note:'one managed site'})).status,200);
  const b=(await f.call('/admin/rnd')).data; assert.equal(b.gates.current_mrr_minor,15000000); assert.equal(b.gates.note,'one managed site');
});
test('R&D mutations require CSRF and a logged-out session cannot reach the board',async()=>{
  const f=fixture(); await f.login();
  assert.equal((await f.call('/admin/rnd/experiments','POST',{title:'X',hypothesis:'Y',cheapest_test:'Z'},{'X-CSRF-Token':'wrong'})).status,403);
  assert.equal((await f.call('/admin/logout','POST',{})).status,200);
  assert.equal((await f.call('/admin/rnd')).status,401);
});
test('a TOTP code cannot be replayed to mint a second session',async()=>{const f=fixture();const code=totpCode(TOTP_SECRET,f.getTime());const first=await f.call('/admin/login','POST',{email:'info@khuselaworkflow.com',password:PASSWORD,otp:code});assert.equal(first.status,200);const second=await f.call('/admin/login','POST',{email:'info@khuselaworkflow.com',password:PASSWORD,otp:code});assert.equal(second.status,401);});
