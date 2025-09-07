import React, { useState, useEffect, useRef } from "react";
import styles from "../style";

const EarlyAccess = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
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

    // Check if we have a turnstile token
    if (!turnstileToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

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
    }
  };

  return (
    <section
      id="early-access"
      className="py-12 px-6 text-white flex flex-col justify-center items-center min-h-screen"
    >
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Pilot Program
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
                className="w-full p-4 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Turnstile Widget */}
          <div className="flex justify-center py-4">
            <div
              ref={turnstileRef}
              className="cf-turnstile"
            ></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Join Free Pilot Program
          </button>

          {/* Privacy Microcopy */}
          <div className="text-xs text-gray-400 text-center space-y-2">
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-400">🔒</span>
              Your info is encrypted and only used to contact you. Protected by Cloudflare.
            </p>
            <p>
              By signing up, you agree to our{" "}
              <button 
                type="button"
                onClick={() => alert("Privacy Policy: We collect only essential information to contact you about EdgeBox services. Your data is encrypted, never sold, and you can request deletion anytime by emailing support@edgebox.africa")}
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </form>

        {/* Contact Information - Separate from form */}
        <div className="mt-8 pt-6 border-t border-gray-700 max-w-md mx-auto">
          <div className="text-center space-y-2">
            <p className="font-semibold text-gray-300 text-sm">EdgeBox Technologies</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                📧 support@edgebox.africa
              </span>
              <span className="hidden sm:block">•</span>
              <span className="flex items-center gap-1">
                🌐 edgebox.africa
              </span>
            </div>
            <p className="text-xs text-gray-500 italic">Rugged Edge Computing Solutions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
