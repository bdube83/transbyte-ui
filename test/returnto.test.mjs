import test from 'node:test';
import assert from 'node:assert/strict';
import { safeReturnTo } from '../src/lib/returnTo.mjs';

test('safeReturnTo allows internal app destinations',()=>{
  for(const v of ['/app','/app/','/app/sites'])assert.equal(safeReturnTo(v),v);
});
test('safeReturnTo rejects open-redirect bypasses and routes without a Phase 1 page',()=>{
  const bad=['//evil.com','/\\evil.com','/%2f%2fevil.com','%2F%2Fevil.com','https://evil.com','https:/evil.com','http://evil.com',' /app','\t/app','/app\r\n','/appevil','/apphack.com','javascript:alert(1)','/partner','/admin/queue','','not-a-path',null,undefined,42];
  for(const v of bad)assert.equal(safeReturnTo(v),'/app',`expected /app for ${JSON.stringify(v)}`);
});
test('safeReturnTo rejects double-encoded traversal to another prefix',()=>{
  assert.equal(safeReturnTo('/%2561pp'),'/app');
  assert.equal(safeReturnTo('/appliance'),'/app');
});
