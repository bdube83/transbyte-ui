import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const OrderForm = ({ order, onOrderPlaced }) => {
  const [formData, setFormData] = useState({
    email: "",
    toAddress: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOrderPlaced(formData);
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-md shadow-md text-white max-w-md mx-auto text-center">
      {/* AI Assistant Greeting */}
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-bold">Hello, I’m Transbyte.</h2>
        <p className="text-sm text-gray-300">
          Just share a few details, and I'll set up your sample delivery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {/* Email Field */}
{/*         <div>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="
              w-full
              bg-[#2E2E2E]
              text-[#E1E1E1]
              placeholder-[#9B9B9B]
              p-3
              rounded-lg
              border
              border-[#444444]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
              duration-200
            "
          />
        </div> */}

        {/* Delivery Address Field */}
        <div>
          <input
            type="text"
            name="toAddress"
            id="toAddress"
            required
            value={formData.toAddress}
            onChange={handleChange}
            placeholder="Enter your delivery address"
            className="
              w-full
              bg-[#2E2E2E]
              text-[#E1E1E1]
              placeholder-[#9B9B9B]
              p-3
              rounded-lg
              border
              border-[#444444]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
              duration-200
            "
          />
        </div>

        {/* Submit Button with Icon and Hover Annotation */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            title="Send Request"
            className="
              inline-flex
              items-center
              gap-2
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-5
              rounded-full
              transition
              duration-200
            "
          >
            <AiOutlineSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
