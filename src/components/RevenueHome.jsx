import React from "react";
import { Link } from "react-router-dom";
import EarlyAccess from "./EarlyAccess";

export default function RevenueHome() {
  return <main className="bg-primary text-white min-h-screen">
    <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold">EDGEBOX</Link>
      <div className="flex gap-6 flex-wrap"><a href="#workflow" className="underline">How it works</a><Link to="/pilot-program" className="underline">Scope and pricing</Link><a href="#early-access" className="underline">Discuss your site</a></div>
    </nav>
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="text-blue-300 font-semibold tracking-wide mb-5">SITE OPERATIONS • IN DEVELOPMENT</p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">One operational problem.<br />A measurable way forward.</h1>
      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mt-8">We are developing an operations layer for existing site cameras: connect an agreed source, identify a defined exception, and give your team the evidence to act. Start with a scoped validation, not a full system replacement.</p>
      <div className="flex flex-wrap gap-4 mt-8"><Link to="/pilot-program" className="px-6 py-3 rounded-lg bg-blue-600 font-semibold">Explore a paid validation</Link><a href="#workflow" className="px-6 py-3 rounded-lg border border-gray-500">See the proposed workflow</a></div>
      <aside className="border border-gray-600 rounded-lg p-5 mt-10 max-w-3xl"><h2 className="font-semibold mb-2">What is available today?</h2><p className="text-gray-300">A feasibility discussion and a proposed pilot scope. Device compatibility, delivery dates, service capabilities and terms must be confirmed before accepting payment. No production accuracy, savings, uptime or certification is claimed here.</p></aside>
    </section>
    <section id="workflow" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">From a camera signal to an accountable action</h2>
      <p className="text-gray-300 max-w-3xl mb-8">The initial product is being designed around one depot or warehouse workflow, such as a queue-time exception or finding dispatch evidence. Selection depends on a real operational need and technical feasibility.</p>
      <ol className="grid md:grid-cols-3 gap-6">
        {[['Agree the baseline','Define one problem, the authorised sources, the current process and the outcome to measure.'],['Validate the workflow','Evaluate compatible sources, operational exceptions and the supporting evidence within a bounded project.'],['Review and expand','Review measured results, limitations and delivery costs before considering a recurring service or more sites.']].map(([title,detail],i)=><li key={title} className="bg-gray-800 p-6 rounded-lg"><p className="text-blue-300 mb-3">0{i+1}</p><h3 className="text-xl font-semibold mb-3">{title}</h3><p className="text-gray-300">{detail}</p></li>)}
      </ol>
    </section>
    <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      <div className="border border-gray-600 rounded-lg p-8"><h2 className="text-2xl font-bold mb-4">Proposed validation</h2><p className="text-3xl font-bold text-blue-300 mb-4">R25,000 once</p><p className="text-gray-300">One site, one agreed workflow, up to eight compatible streams and a scoped 30-day validation. Hardware, travel, third-party licences and extra integrations are separately quoted unless included in writing.</p></div>
      <div className="border border-gray-600 rounded-lg p-8"><h2 className="text-2xl font-bold mb-4">Proposed recurring service</h2><p className="text-3xl font-bold text-blue-300 mb-4">R15,000 / site / month</p><p className="text-gray-300">A potential follow-on service, subject to successful validation and agreed source, storage, notification and support limits. Not an automatic subscription or an unlimited service.</p></div>
      <p className="md:col-span-2 text-sm text-gray-400">Prices are indicative and exclude VAT where applicable. A written proposal confirms feasibility, deliverables, payment and cancellation terms. Existing signed agreements are not changed.</p>
    </section>
    <section className="max-w-6xl mx-auto px-6 py-12"><h2 className="text-3xl font-bold mb-4">For operators, developers and installation partners</h2><p className="text-gray-300 max-w-3xl">The planned platform combines a customer console with documented APIs for sites, events and evidence. Local processing and synchronisation are design goals, subject to tested hardware, power and connectivity limits. Production API access and partner agreements are not yet generally available.</p></section>
    <EarlyAccess />
    <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-gray-700 flex flex-wrap gap-6"><Link to="/privacy-policy" className="underline">Privacy policy</Link><Link to="/terms-of-service" className="underline">Terms of service</Link><a href="mailto:support@edgebox.africa" className="underline">support@edgebox.africa</a></footer>
  </main>;
}
