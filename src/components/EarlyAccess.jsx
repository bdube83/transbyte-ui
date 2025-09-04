import React, { useState } from "react";
import styles from "../style";

const EarlyAccess = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual sign-up logic (e.g., API call)
    console.log("Early Access Sign Up:", { name, email });
    // Clear the form after submission
    setName("");
    setEmail("");
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
