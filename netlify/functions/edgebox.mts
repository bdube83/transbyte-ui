import type { Context, Config } from '@netlify/functions';
import { getStore, getDeployStore } from '@netlify/blobs';
import { OAuth2Client } from 'google-auth-library';
import { application, type Storage } from '../../server/app.ts';

declare const Netlify: { env: { get(name: string): string | undefined } };
export default async (request: Request, context: Context) => {
  try {
    const production=context.deploy.context==='production' && context.deploy.published;
    const store=production?getStore({name:'edgebox-owner-v1',consistency:'strong'}):getDeployStore({name:'edgebox-owner-v1',consistency:'strong'});
    const storage:Storage={
      async read(key){const entry=await store.getWithMetadata(key,{type:'json'});return entry?{data:entry.data,etag:entry.etag}:null;},
      async write(key,data,etag){const result=await store.setJSON(key,data,etag===null?{onlyIfNew:true}:{onlyIfMatch:etag});if(result.modified && !result.etag)throw new Error('Unconfirmed storage write');return result.modified;}
    };
    const url=new URL(request.url);
    const origin=production?(Netlify.env.get('EDGEBOX_SITE_ORIGIN') || 'https://edgebox.africa'):url.origin;
    if(!production && (url.protocol!=='https:' || !url.hostname.endsWith(`--${context.site.name}.netlify.app`)))return Response.json({error:'Use the authorised preview URL.'},{status:403});
    if(request.method==='GET' && url.pathname==='/api/v1/health/storage'){
      // Fixed, non-sensitive sentinel only. This cannot read or change user accounts.
      const key='system/persistence-v1';
      const old=await storage.read(key);
      if(!old)await storage.write(key,{marker:'edgebox-persistence-v1',createdAt:new Date().toISOString()},null);
      const check=await storage.read(key);
      if(check?.data.marker!=='edgebox-persistence-v1')throw new Error('Persistence probe failed');
      return Response.json({storage:'ok',persisted:true,created_at:check.data.createdAt,scope:production?'production':'deploy-preview'},{headers:{'Cache-Control':'no-store'}});
    }
    const googleClientId=Netlify.env.get('EDGEBOX_GOOGLE_CLIENT_ID');
    const google=new OAuth2Client(googleClientId);
    const handler=application({storage,settings:{origin,googleClientId,
      ownerEmail:Netlify.env.get('EDGEBOX_OWNER_EMAIL') || '',
      ownerCodeHash:production?Netlify.env.get('EDGEBOX_OWNER_CODE_HASH'):undefined,
      ownerCodeExpires:production?Number(Netlify.env.get('EDGEBOX_OWNER_CODE_EXPIRES')):undefined},
      verifyGoogle:async token=>(await google.verifyIdToken({idToken:token,audience:googleClientId})).getPayload()});
    return await handler(request,context.ip);
  } catch {
    return Response.json({error:'Service unavailable. Please try again.',request_id:context.requestId},{status:503,headers:{'Cache-Control':'no-store'}});
  }
};
export const config:Config={path:'/api/v1/*',rateLimit:{action:'rate_limit',windowLimit:120,windowSize:60,aggregateBy:['ip','domain']}};
