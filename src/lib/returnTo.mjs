// Only known internal destinations. Commercial access is still enforced by the server.
export function safeReturnTo(raw){
  if(typeof raw!=='string' || !raw)return '/app';
  if(/[\\\s\x00-\x1f]/.test(raw) || /%|[?#]/.test(raw))return '/app';
  if(raw==='/commercial' || raw==='/commercial/')return '/commercial';
  // Preserve existing app subroutes, but reject traversal and protocol delimiters.
  if(raw.split('/').some(p=>p==='.' || p==='..') || raw.includes('//'))return '/app';
  return /^\/app(?:\/|$)/.test(raw)?raw:'/app';
}
