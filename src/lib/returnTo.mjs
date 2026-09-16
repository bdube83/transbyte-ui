// Allow only internal app destinations that actually have routes; reject absolute,
// protocol-relative, encoded and control-char redirects so the login flow cannot be turned
// into an open redirect. Phase 1 ships only /app; /partner and /admin re-enter when their
// routes land.
export function safeReturnTo(raw){
  if(typeof raw!=='string' || !raw)return '/app';
  let value;try{value=decodeURIComponent(raw);}catch{return '/app';}
  value=value.replace(/\\/g,'/');
  if(/[\s\x00-\x1f]/.test(value))return '/app';
  return /^\/app(\/|$)/.test(value)?value:'/app';
}
