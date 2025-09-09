import React, { useState, useEffect, useRef } from "react";
import styles from "../style";
import CalendlyButton from "./CalendlyButton";

const EarlyAccess = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const turnstileRef = useRef(null);
  const widgetId = useRef(null);

  // Use demo site key if environment variable is not set
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
      const resp = await fetch("https://api.edgebox.africa/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, "cf-turnstile-response": turnstileToken }),
      });

      const result = await resp.json();
      if (result.success) {
        alert("Thanks for joining our pilot program! We'll contact you soon.");
        setName("");
        setEmail("");
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
      id="early-access"
      className="py-12 px-6 text-white flex flex-col justify-center items-center min-h-screen"
    >
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sign Up
        </h2>
        <p className="mb-6 text-gray-300">
          Sign up now for a free site assessment and be among the first to deploy EdgeBox at your location!
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6"
        >
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className={`w-full p-4 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className={`w-full p-4 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Turnstile Widget */}
          <div className={`flex justify-center py-4 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            <div
              ref={turnstileRef}
              className="cf-turnstile"
            ></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-4 px-6 rounded-lg transition-colors shadow-lg ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-xl'
            } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Join Free Pilot Program'
            )}
          </button>

          {/* Compact Privacy Info */}
          <div className="text-xs text-gray-400 text-center">
            <p className="flex items-center justify-center gap-2 mb-1">
              <span className="text-green-400">🔒</span>
              Protected by Cloudflare • 
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
        </form>

        {/* Simplified Additional Options */}
        <div className="mt-6 pt-4 border-t border-gray-700 max-w-md mx-auto text-center">
          <p className="text-sm text-gray-300 mb-3">Want to speak with our founder first?</p>
          
          <CalendlyButton 
            text="Talk to Bongani" 
            variant="outline"
            size="small"
            className="mb-4"
          />
          
          {/* Compact Contact Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>EdgeBox Technologies</strong></p>
            <div className="flex justify-center items-center gap-3">
              <span>📧 support@edgebox.africa</span>
              <span>🌐 edgebox.africa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
