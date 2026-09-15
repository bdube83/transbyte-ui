import React, { useEffect, useRef, useState } from "react";
import CalendlyButton from "./CalendlyButton";

export default function EarlyAccess() {
  const [name,setName]=useState(""), [email,setEmail]=useState(""), [token,setToken]=useState(null), [busy,setBusy]=useState(false), [status,setStatus]=useState("");
  const target=useRef(null), widgetId=useRef(null);
  const siteKey=import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
  // Explicit verification gate. Do not silently use an always-pass test key in production.
  const enabled=import.meta.env.VITE_LEAD_CAPTURE_VERIFIED === "true" && Boolean(siteKey) && !/^[123]x0+/.test(siteKey);
  useEffect(()=>{
    if(!enabled) return;
    let stopped=false;
    const render=()=>{
      if(stopped || widgetId.current!==null || !window.turnstile || !target.current) return;
      try { widgetId.current=window.turnstile.render(target.current,{sitekey:siteKey,callback:setToken,"expired-callback":()=>setToken(null),"error-callback":()=>{setToken(null);setStatus("Verification could not load. Please use the booking or email link below.");}}); }
      catch { setStatus("Verification unavailable. Please use booking or email."); }
    };
    render(); const poll=setInterval(render,200); const timeout=setTimeout(()=>{clearInterval(poll);if(widgetId.current===null)setStatus("Verification unavailable. Please use booking or email.");},10000);
    return()=>{stopped=true;clearInterval(poll);clearTimeout(timeout);if(widgetId.current!==null && window.turnstile)try{window.turnstile.remove(widgetId.current);}catch{/* Widget may already have been removed. */}widgetId.current=null;};
  },[enabled,siteKey]);
  async function submit(event) {
    event.preventDefault(); if(!enabled || !token || busy)return;
    setBusy(true);setStatus("");const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
    try{
      const response=await fetch("https://api.edgebox.africa/early-access",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name.trim(),email:email.trim(),"cf-turnstile-response":token}),signal:controller.signal});
      const result=await response.json();
      if(!response.ok || result.success!==true)throw new Error("Submission was not confirmed. Please try again or contact us by email.");
      setStatus("The service confirmed your enquiry. This is not a pilot booking or a purchase.");setName("");setEmail("");
    }catch(error){setStatus(error.name==="AbortError"?"The request timed out; receipt is unknown. Please contact us by email before resubmitting.":"Submission was not confirmed. Please use booking or email if the problem continues.");}
    finally{clearTimeout(timeout);setBusy(false);setToken(null);if(window.turnstile && widgetId.current!==null)try{window.turnstile.reset(widgetId.current);}catch{/* User may use the alternative contact route. */}}
  }
  return <section id="early-access" className="max-w-3xl mx-auto px-6 py-16 text-white">
    <h2 className="text-3xl font-bold mb-4">Discuss your site</h2><p className="text-gray-300 mb-6">Start with a feasibility discussion. It does not enrol you in a free pilot or commit either party to paid work.</p>
    {enabled?<form onSubmit={submit} className="space-y-4"><label className="block">Name<input required maxLength={120} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} disabled={busy} className="block w-full mt-1 p-3 rounded text-black" /></label><label className="block">Work email<input required type="email" maxLength={254} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} disabled={busy} className="block w-full mt-1 p-3 rounded text-black" /></label><div ref={target} /><p className="text-sm text-gray-400">We use these details to respond to this enquiry. Read our <a className="underline" href="/privacy-policy">privacy policy</a>.</p><button disabled={busy || !token} className="bg-blue-600 disabled:opacity-50 px-6 py-3 rounded">{busy?"Sending enquiry…":"Send enquiry"}</button></form>:<p className="border border-gray-600 rounded-lg p-5 text-gray-300 mb-6">The online enquiry form is temporarily unavailable while receipt and data-handling checks are completed. Please use the existing booking or email option below.</p>}
    <p role="status" aria-live="polite" className="my-4">{status}</p><div className="flex flex-wrap items-center gap-6"><CalendlyButton text="Book a feasibility discussion" variant="primary" size="large" /><a href="mailto:support@edgebox.africa?subject=Edgebox%20site%20feasibility" className="underline text-blue-300">Email support@edgebox.africa</a></div>
  </section>;
}
