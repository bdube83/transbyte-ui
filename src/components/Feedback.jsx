import React, { useState } from "react";
import styles, { layout } from "../style";

const Feedback = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you’d send formData to your backend or email service
    console.log("User Feedback:", formData);

    // Clear the form or show a success message
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      additionalInfo: "",
    });
  };

  return (
    <section
      className={`min-h-screen ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY}`}
      id="contact-us"
    >
      <div className={`${styles.boxWidth} bg-[#1C1C1C] p-8 rounded-lg shadow-md w-full max-w-[600px]`}>
        <h2 className={`${styles.heading2} text-center mb-6`}>Talk To Our Team</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="+1 234 567 8900"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="companyName">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Your Company"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="jobTitle">
              Job title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="e.g. Manager, Developer"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="additionalInfo">
              Additional Information (optional)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Anything else you'd like us to know?"
              rows={3}
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feedback;
