import React, { useState, useEffect, useRef } from "react";
import styles from "../style";
import { founderBongani, linkedin } from "../assets";
import CalendlyButton from "./CalendlyButton";

const FounderSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    additionalInfo: ""
  });

  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const turnstileRef = useRef(null);
  const widgetId = useRef(null);

  // Use environment variable with fallback to demo key
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  useEffect(() => {
    // Initialize Turnstile when the script is loaded
    const initializeTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            setTurnstileToken(token);
          },
          "error-callback": () => {
            console.error("Turnstile error");
            setTurnstileToken(null);
          },
          "expired-callback": () => {
            console.log("Turnstile expired");
            setTurnstileToken(null);
          },
        });
      }
    };

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      initializeTurnstile();
    } else {
      // Wait for the script to load
      const checkTurnstile = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstile);
          initializeTurnstile();
        }
      }, 100);

      // Clean up interval after 10 seconds
      setTimeout(() => clearInterval(checkTurnstile), 10000);
    }

    // Cleanup function
    return () => {
      if (window.turnstile && widgetId.current) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch (e) {
          console.log("Error removing turnstile widget:", e);
        }
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      alert("Please complete the CAPTCHA verification");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://api.edgebox.africa/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Message sent successfully! We'll get back to you soon.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          jobTitle: "",
          additionalInfo: ""
        });
        
        // Reset CAPTCHA
        if (window.turnstile && widgetId.current) {
          window.turnstile.reset(widgetId.current);
          setTurnstileToken(null);
        }
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact-us" className={`${styles.paddingY} ${styles.paddingX} bg-primary`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 items-start">
          
          {/* Left Side - Meet Your Technology Partner */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Header */}
            <div className="text-center xl:text-left">
              <h2 className={`${styles.heading2} text-gradient mb-6`}>
                Meet Your Technology Partner
              </h2>
            </div>

            {/* Founder Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Founder Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <img
                    src={founderBongani}
                    alt="Bongani Dube - Founder & CEO"
                    className="relative w-64 h-64 object-cover rounded-full border-4 border-gradient shadow-2xl"
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Founder & CEO
                  </div>
                </div>
              </div>

              {/* Founder Details */}
              <div className="text-white space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Bongani Dube</h3>
                  <p className="text-blue-400 font-medium">Founder & CEO, EdgeBox Technologies</p>
                </div>

                {/* Professional Background */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-blue-400 text-sm">Background</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• CSIR AI award recipient</li>
                    <li>• FinTech & AWS expertise</li>
                    <li>• UCT Computer Science graduate</li>
                  </ul>
                </div>

                {/* Contact Links */}
                <div className="flex gap-4">
                  <a 
                    href="mailto:bongani@edgebox.africa"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    📧 Email
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/bongani-dube-86944479/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    <img src={linkedin} alt="LinkedIn" className="w-3 h-3" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Inspirational Quote */}
            <blockquote className="relative bg-gray-800/30 p-6 rounded-lg">
              <div className="absolute -top-2 -left-2 text-4xl text-blue-500/30 font-serif">"</div>
              <p className="text-base italic text-gray-300 pl-6 pr-4">
                "EdgeBox isn't just about AI, it's about bringing enterprise-grade computing 
                power to every corner of Africa. We're not just connecting devices; we're connecting visions to reality."
              </p>
              <div className="absolute -bottom-2 -right-2 text-4xl text-blue-500/30 font-serif">"</div>
            </blockquote>

            {/* Meeting CTA */}
            <div className="bg-blue-600/10 border border-blue-600/30 p-6 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Ready for a Consultation?</h4>
              <CalendlyButton 
                text="Schedule Meeting" 
                variant="primary"
                size="medium"
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Right Side - Talk To Our Team Form */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-lg border border-gray-600 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4">Talk To Our Team</h3>
              <p className="text-gray-300 text-sm mb-6">
                Get early access to EdgeBox technology.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="+27 XX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Your role"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">
                    How can we help?
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="3"
                    disabled={isLoading}
                    className={`w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm resize-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Tell us about your use case or questions..."
                  />
                </div>

                {/* Cloudflare Turnstile */}
                <div className={`flex justify-center ${isLoading ? 'opacity-50' : ''}`}>
                  <div ref={turnstileRef}></div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {/* Privacy notice */}
                <p className="text-xs text-gray-400 text-center">
                🔒 By submitting this form, you agree to our{" "}
                  <a href="/privacy-policy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                  . Your info is encrypted and POPIA compliant.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">Trusted by forward-thinking organizations across Africa</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
