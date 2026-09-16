import test from 'node:test';
import assert from 'node:assert/strict';
import { application, digest } from '../server/app.ts';
import { commercialApplication, commercialAccess } from '../server/commercial.ts';
class Store { rows=new Map(); async read(k){return structuredClone(this.rows.get(k)||null);} async write(k,d,e){const old=this.rows.get(k);if((old?.etag??null)!==e)return false;this.rows.set(k,{data:structuredClone(d),etag:String(Number(e||0)+1)});return true;} }
async function setup(internal=true){
 const storage=new Store(),now=()=>Date.parse('2026-09-16T18:00:00Z');
 const settings={origin:'https://edgebox.africa',internalSubs:internal?['internal-fixture']:[]};
 const token='synthetic-test-session',id='test-operator';
 await storage.write(`sessions/${digest(token)}`,{idId:id,sub:'internal-fixture',email:'operator@example.test',csrf:'csrf-fixture',expires:now()+3600000,revoked:false},null);
 const base=application({storage,settings,now,verifyGoogle:async()=>{throw Error('Google not used in this session fixture');}});
 const app=commercialApplication({storage,origin:settings.origin,authorize:commercialAccess(base),now});
 const call=(body,extra={})=>app(new Request(settings.origin+(body?'/api/v1/commercial/commands':'/api/v1/commercial'),{method:body?'POST':'GET',headers:{Origin:settings.origin,Cookie:`__Host-eb-session=${token}`,'Content-Type':'application/json','X-CSRF-Token':'csrf-fixture','Idempotency-Key':'integration-001',...extra},...(body?{body:JSON.stringify(body)}:{})}),'test-ip');
 return {storage,settings,call,token};
}
const command={type:'account.create',revision:0,payload:{name:'Fixture only',kind:'business',sourceRef:'TEST-SOURCE',testRecord:true}};
test('commercial route reuses the real application session and internal allowlist',async()=>{const f=await setup();assert.equal((await f.call()).status,200);assert.equal((await f.call(command)).status,201);assert.equal((await (await f.call()).json()).accounts.length,1);});
test('organisation headers and ordinary owner accounts cannot grant commercial admin',async()=>{const f=await setup(false);assert.equal((await f.call(command,{'X-Edgebox-Org':'abcd'.repeat(8),'X-Role':'admin'})).status,403);assert.equal(f.storage.rows.has('commercial/v1/operations'),false);});
test('revoked internal privilege and sessions take effect on the next request',async()=>{const f=await setup();assert.equal((await f.call()).status,200);f.settings.internalSubs=[];assert.equal((await f.call()).status,403);f.settings.internalSubs=['internal-fixture'];const k=`sessions/${digest(f.token)}`,r=await f.storage.read(k);await f.storage.write(k,{...r.data,revoked:true},r.etag);assert.equal((await f.call()).status,401);});
test('source API tokens and missing CSRF cannot mutate commercial state',async()=>{const f=await setup();assert.equal((await f.call(command,{'X-CSRF-Token':'wrong'})).status,403);assert.equal((await f.call(command,{Cookie:'',Authorization:'Bearer eb_source-token'})).status,401);});
