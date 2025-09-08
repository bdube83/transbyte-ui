import React, { useState, useEffect, useRef } from "react";
import styles, { layout } from "../style";
import CalendlyButton from "./CalendlyButton";

const Feedback = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    additionalInfo: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isLoading) return;

    // Check if we have a turnstile token
    if (!turnstileToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    setIsLoading(true);

    try {
      const resp = await fetch("https://api.edgebox.africa/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "cf-turnstile-response": turnstileToken }),
      });

      const result = await resp.json();
      if (result.success) {
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          jobTitle: "",
          additionalInfo: "",
        });
        // Reset the CAPTCHA
        if (window.turnstile && widgetId.current) {
          window.turnstile.reset(widgetId.current);
          setTurnstileToken(null);
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY}`}
      id="contact-us"
    >
      <div className={`${styles.boxWidth} bg-[#1C1C1C] p-8 rounded-lg shadow-md w-full max-w-[600px]`}>
        <div className="text-center mb-6">
          <h2 className={`${styles.heading2} mb-4`}>Talk To Our Team</h2>
          <p className="text-gray-400 mb-4">Get in touch with us through the form below or schedule a direct meeting.</p>
          
          {/* Alternative Contact Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <CalendlyButton 
              text="Schedule 30min Meeting" 
              variant="primary"
              size="medium"
            />
            <CalendlyButton 
              text="Quick Call" 
              variant="outline"
              size="medium"
            />
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">or fill out the form</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-5 ${isLoading ? 'pointer-events-none' : ''}`}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="+1 234 567 8900"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="companyName">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Your Company"
              value={formData.companyName}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="jobTitle">
              Job title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="e.g. Manager, Developer"
              value={formData.jobTitle}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="additionalInfo">
              Additional Information (optional)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Anything else you'd like us to know?"
              rows={3}
              value={formData.additionalInfo}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full rounded-md border border-gray-300 p-3 text-black transition-opacity ${
                isLoading ? 'opacity-50' : ''
              }`}
            />
          </div>

          {/* Turnstile Widget */}
          <div className={`flex justify-center ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            <div
              ref={turnstileRef}
              className="cf-turnstile"
            ></div>
          </div>

          {/* Privacy Microcopy */}
          <div className="text-xs text-gray-400 text-center">
            <p className="mb-2">
              🔒 Your info is encrypted and only used to contact you. Protected by Cloudflare.
            </p>
            <p>
              By submitting, you agree to our{" "}
              <a 
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3 rounded-md transition-colors ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>

          {/* Contact Information */}
          <div className="text-xs text-gray-400 text-center mt-4 pt-4 border-t border-gray-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <div>
                <p className="font-semibold text-gray-300">Contact Us Directly</p>
                <p>📧 support@edgebox.africa</p>
                <p>💬 WhatsApp: +27 767 813 100</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300">EdgeBox Technologies</p>
                <p>🌐 edgebox.africa</p>
                <p>📍 Cape Town, Milnerton, 7441, South Africa</p>
              </div>
            </div>
            <p className="text-center">Rugged Edge Computing Solutions</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Feedback;
