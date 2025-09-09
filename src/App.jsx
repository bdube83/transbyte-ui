import { Home, Results, HowItWorks, Feedback, PrivacyPolicy, TermsOfService, PilotProgram, BlogPost, BlogPage, Partners, CookieBanner } from "./components";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/search" element={<Results />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/pilot-program" element={<PilotProgram />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/edge-ai-vs-cloud-loadshedding" element={<BlogPost />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
  );
};

export default App;
