import React, { useState } from "react";

const Search = ({ onLaunchDemo }) => {
  const [query, setQuery] = useState("");

  const handleContactUs = () => {
    window.location.href = "#contact-us";
  };

  return (
    <div className="mt-6">
      <div className="mt-4">
        <button
          onClick={handleContactUs}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Request Demo
        </button>
      </div>
    </div>
  );
};

export default Search;
