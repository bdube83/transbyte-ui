import React from "react";

const CalendlyButton = ({ 
  text = "Schedule time with me", 
  variant = "primary",
  size = "medium",
  className = "" 
}) => {
  const handleCalendlyClick = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/bongani-edgebox/30min'
      });
    } else {
      // Fallback if Calendly hasn't loaded yet
      setTimeout(() => {
        if (window.Calendly) {
          window.Calendly.initPopupWidget({
            url: 'https://calendly.com/bongani-edgebox/30min'
          });
        }
      }, 500);
    }
  };

  // Define variant styles
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    text: "text-blue-500 hover:text-blue-400 underline"
  };

  // Define size styles
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const baseStyles = "font-semibold rounded-lg transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2";
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.medium;

  return (
    <button
      onClick={handleCalendlyClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      <span>📅</span>
      {text}
    </button>
  );
};

export default CalendlyButton;
