import React, { useState, useEffect } from "react";
import { FaCookie, FaTimes } from "react-icons/fa";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('edgebox-cookie-consent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('edgebox-cookie-consent', 'accepted');
    localStorage.setItem('edgebox-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('edgebox-cookie-consent', 'declined');
    localStorage.setItem('edgebox-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 transition-all duration-300 ${isMinimized ? 'transform translate-y-12' : ''}`}>
      {/* Minimized View */}
      {isMinimized && (
        <div 
          className="bg-gray-800/95 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg border border-gray-600 cursor-pointer hover:bg-gray-700/95 transition-colors"
          onClick={handleMinimize}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaCookie className="text-orange-400" />
              <span className="text-sm font-medium">Cookie Settings</span>
            </div>
            <span className="text-xs text-gray-400">Click to expand</span>
          </div>
        </div>
      )}

      {/* Full View */}
      {!isMinimized && (
        <div className="bg-gray-800/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-gray-600">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FaCookie className="text-orange-400 text-lg" />
              <h3 className="font-semibold text-sm">Privacy & Cookies</h3>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={handleMinimize}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Minimize"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Close"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <p className="text-xs text-gray-300 leading-relaxed">
              We use essential cookies for website functionality and optional analytics cookies 
              to improve your experience. Your data is protected under POPIA compliance.
            </p>

            {/* Cookie Types */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Essential Cookies</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Required</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Analytics & Performance</span>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="sr-only"
                    id="analytics-cookies"
                  />
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Prototype Disclaimer */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
              <p className="text-xs text-orange-300">
                <strong>Prototype Notice:</strong> EdgeBox is in development. Results may vary.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium py-2 px-3 rounded transition-colors"
              >
                Essential Only
              </button>
            </div>

            {/* Links */}
            <div className="flex justify-between text-xs">
              <a 
                href="/privacy-policy" 
                className="text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-blue-400 hover:underline"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
