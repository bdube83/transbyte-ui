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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 rounded w-full sm:w-auto text-black border border-gray-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded w-full sm:w-auto text-black border border-gray-300"
          />

          {/* Turnstile Widget */}
          <div
            ref={turnstileRef}
            className="cf-turnstile flex justify-center"
          ></div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default EarlyAccess;
