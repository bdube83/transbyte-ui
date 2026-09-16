import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import RevenueHome from './components/RevenueHome';
import BusinessHome from './components/BusinessHome';
import ConsumerHome from './components/ConsumerHome';
import Results from './components/Results';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookieBanner from './components/CookieBanner';
const AccountApp=lazy(()=>import('./components/AccountApp'));
const SignIn=lazy(()=>import('./components/AccountApp').then(m=>({default:m.SignIn})));
const ApiGuide=lazy(()=>import('./components/ApiGuide'));
const CommercialApp=lazy(()=>import('./components/CommercialApp'));
function NotFound(){return <main className="bg-primary text-white min-h-screen grid place-items-center px-6"><div><h1 className="text-3xl font-bold mb-4">Page not found</h1><Link to="/" className="underline">Go to Edgebox</Link></div></main>;}
export default function App(){return <BrowserRouter><Suspense fallback={<main className="p-8" role="status">Loading…</main>}><Routes><Route path="/" element={<RevenueHome/>}/><Route path="/home" element={<ConsumerHome/>}/><Route path="/business" element={<BusinessHome/>}/><Route path="/pilot-program" element={<BusinessHome/>}/><Route path="/signin" element={<SignIn/>}/><Route path="/app" element={<AccountApp/>}/><Route path="/dashboard" element={<AccountApp/>}/><Route path="/commercial" element={<CommercialApp/>}/><Route path="/admin" element={<Navigate to="/commercial" replace/>}/><Route path="/docs/api" element={<ApiGuide/>}/><Route path="/privacy-policy" element={<PrivacyPolicy/>}/><Route path="/terms-of-service" element={<TermsOfService/>}/><Route path="/search" element={<Results/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense><CookieBanner/></BrowserRouter>;}
