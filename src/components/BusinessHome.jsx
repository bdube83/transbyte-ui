import React from "react";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";

export default function BusinessHome() {
  return <main className="bg-primary text-white min-h-screen">
    <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between"><Link to="/" className="font-bold text-xl">EDGEBOX</Link><Link to="/home" className="underline text-sm">For your home</Link></nav>

    <section className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-blue-300 font-semibold mb-3">EDGEBOX FOR BUSINESS</p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">Make the cameras you already have more useful.</h1>
      <p className="text-xl text-gray-300 mt-6 max-w-3xl">Get useful alerts, know when cameras stop reporting, and get to the right event faster.</p>
    </section>

    <section className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 flex flex-col">
        <p className="text-blue-300 font-semibold mb-2">FOR YOUR PREMISES</p>
        <h2 className="text-3xl font-bold">Protect a shop, office, yard or site</h2>
        <p className="text-gray-300 mt-4 mb-6">Keep compatible cameras. We check the setup first, then recommend the simplest alert or monitoring option that fits.</p>
        <ul className="space-y-3 text-gray-200 mb-8"><li>• Person or vehicle alerts where supported</li><li>• Camera and site health</li><li>• Event history that is easier to review</li></ul>
        <div className="mt-auto"><CalendlyButton text="Check my cameras" variant="primary" size="large" /></div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 flex flex-col">
        <p className="text-blue-300 font-semibold mb-2">FOR SECURITY COMPANIES & INSTALLERS</p>
        <h2 className="text-3xl font-bold">Add smarter camera services to your customers</h2>
        <p className="text-gray-300 mt-4 mb-6">Use Edgebox behind your existing customer and response operation. Manage sites, camera health and events in one place, with APIs for your own systems.</p>
        <ul className="space-y-3 text-gray-200 mb-8"><li>• Existing-camera integrations</li><li>• Multi-customer site and device view</li><li>• Event handoff to your control-room workflow</li></ul>
        <a href="mailto:support@edgebox.africa?subject=Edgebox%20security%20partner" className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-500 rounded-lg px-6 py-3 font-semibold">Talk about partnering</a>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-800">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div><p className="text-blue-300 font-semibold mb-2">LOGISTICS & OPERATIONS</p><h2 className="text-3xl font-bold">Need more than security?</h2><p className="text-gray-300 mt-4">For depots, warehouses and yards, we can look at a specific problem such as long vehicle waits or finding loading and dispatch evidence.</p></div>
        <div><CalendlyButton text="Discuss an operations problem" variant="outline" size="large" /><p className="text-sm text-gray-500 mt-3">We price operational work after understanding the problem and existing systems.</p></div>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold">Start with what you already have.</h2><p className="text-gray-300 mt-3 mb-6">Tell us your camera or recorder brand and what you want to improve. We will check compatibility before recommending anything paid.</p><CalendlyButton text="Check my setup" variant="primary" size="large" /></section>

    <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-gray-800 flex gap-6 text-sm text-gray-400"><Link to="/privacy-policy" className="underline">Privacy</Link><Link to="/terms-of-service" className="underline">Terms</Link><a href="mailto:support@edgebox.africa" className="underline">Contact</a></footer>
  </main>;
}
