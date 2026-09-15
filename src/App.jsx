import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RevenueHome from "./components/RevenueHome";
import BusinessHome from "./components/BusinessHome";
import ConsumerHome from "./components/ConsumerHome";
import Results from "./components/Results";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookieBanner from "./components/CookieBanner";

function NotFound() {
  return <main className="bg-primary text-white min-h-screen grid place-items-center px-6"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Page not found</h1><Link to="/" className="underline text-blue-300">Go to Edgebox</Link></div></main>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<RevenueHome />} />
    <Route path="/home" element={<ConsumerHome />} />
    <Route path="/business" element={<BusinessHome />} />
    <Route path="/pilot-program" element={<BusinessHome />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/search" element={<Results />} />
    <Route path="*" element={<NotFound />} />
  </Routes><CookieBanner /></BrowserRouter>;
}
