import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import RevenueHome from "./components/RevenueHome";
import Results from "./components/Results";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import PilotProgram from "./components/PilotProgram";
import CookieBanner from "./components/CookieBanner";

function RevisedPage() {
  const location = useLocation();
  return <main className="bg-primary text-white min-h-screen px-6 py-16"><div className="max-w-3xl mx-auto"><Link to="/" className="text-blue-300 underline">Back to Edgebox</Link><h1 className="text-4xl font-bold mt-8 mb-6">A more focused Edgebox</h1><p className="text-lg text-gray-300">The previous marketing material at <code>{location.pathname}</code> has been withdrawn while its claims and evidence are reviewed. It is not a statement of current product capability or an existing partnership.</p><p className="mt-6 text-gray-300">Read the current scoped validation offer, or discuss a specific operational problem with us. No existing signed agreement is amended by this notice.</p><Link to="/pilot-program" className="inline-block bg-blue-600 rounded-lg px-6 py-3 mt-8">View the proposed pilot scope</Link></div></main>;
}
export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<RevenueHome />} />
    <Route path="/pilot-program" element={<PilotProgram />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/search" element={<Results />} />
    <Route path="/how-it-works" element={<RevisedPage />} />
    <Route path="/feedback" element={<RevisedPage />} />
    <Route path="/partners" element={<RevisedPage />} />
    <Route path="/blog/*" element={<RevisedPage />} />
    <Route path="*" element={<RevisedPage />} />
  </Routes><CookieBanner /></BrowserRouter>;
}
