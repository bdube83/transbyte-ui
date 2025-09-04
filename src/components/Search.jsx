import React, { useState } from "react";

const Search = ({ onLaunchDemo }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Your search logic here...
    console.log("Searching for:", query);
  };

  return (
    <div className="mt-6">
      <div className="mt-4">
        <button
          onClick={onLaunchDemo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Launch Demo
        </button>
      </div>
    </div>
  );
};

export default Search;
