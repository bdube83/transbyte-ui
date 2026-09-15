import React from "react";
import { Link } from "react-router-dom";

const Choice = ({ to, eyebrow, title, body, action, primary = false }) => (
  <Link to={to} className={`block rounded-2xl p-8 border transition-transform hover:-translate-y-1 ${primary ? "bg-blue-600 border-blue-500" : "bg-gray-900 border-gray-700"}`}>
    <p className="text-sm font-semibold uppercase tracking-wide text-blue-200 mb-3">{eyebrow}</p>
    <h2 className="text-3xl font-bold mb-3">{title}</h2>
    <p className="text-gray-200 mb-6 max-w-md">{body}</p>
    <span className="font-semibold underline">{action} →</span>
  </Link>
);

export default function RevenueHome() {
  return <main className="bg-primary text-white min-h-screen">
    <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between gap-4" aria-label="Main navigation">
      <Link to="/" className="text-2xl font-bold">EDGEBOX</Link>
      <a href="mailto:support@edgebox.africa" className="text-sm md:text-base underline">Contact</a>
    </nav>

    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">Make your cameras useful.</h1>
      <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">Edgebox turns camera activity into alerts and useful evidence. Choose where you want to use it.</p>
    </section>

    <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-6" aria-label="Choose Edgebox for home or business">
      <Choice to="/home" eyebrow="For you" title="Edgebox Home" body="Know what is happening around your home without watching camera feeds all day." action="See Edgebox for home" />
      <Choice to="/business" eyebrow="For your business" title="Edgebox Business" body="Turn existing cameras into operational alerts and evidence for your team." action="See Edgebox for business" primary />
    </section>

    <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-gray-800 flex flex-wrap gap-6 text-sm text-gray-400">
      <Link to="/privacy-policy" className="underline">Privacy</Link><Link to="/terms-of-service" className="underline">Terms</Link><a href="mailto:support@edgebox.africa" className="underline">support@edgebox.africa</a>
    </footer>
  </main>;
}
