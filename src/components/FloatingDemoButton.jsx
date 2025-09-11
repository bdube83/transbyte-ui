import React from "react";

const FloatingDemoButton = () => {
  const handleContactUs = () => {
    window.location.href = "#contact-us";
  };

  return (
    <button
      onClick={handleContactUs}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2 group"
      style={{
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
      }}
    >
      <span className="text-sm font-medium">Request Live Demo</span>
      <svg 
        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M14 5l7 7m0 0l-7 7m7-7H3" 
        />
      </svg>
    </button>
  );
};

export default FloatingDemoButton;
