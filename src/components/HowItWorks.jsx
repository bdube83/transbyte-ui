import React from "react";
import { AiOutlineForm, AiOutlineLock, AiOutlineCar, AiOutlineCheckCircle } from "react-icons/ai";

const HowItWorks = ({ onLaunchDemo }) => {
  const handleContactUs = () => {
    window.location.href = "#contact-us";
  };
  
  return (
    <section
      id="how-it-works"
      className="min-h-screen flex flex-col justify-center items-center text-white px-6"
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          How It Works
        </h2>
        <p className="text-center text-gray-300 max-w-xl mx-auto mb-8">
          Follow these steps to implement edge computing at your site for maximum efficiency and cost savings.
          <br />
          Each step is designed to give you the most reliable and resilient computing infrastructure possible.
        </p>

        {/* Four-Column Steps */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Step 1 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineForm size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">1. Site Assessment</h3>
            <p className="text-sm text-gray-300">
              We analyze your environment, connectivity, and computing requirements for optimal deployment.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineLock size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">2. Deploy Edge Nodes</h3>
            <p className="text-sm text-gray-300">
              Install rugged computing hardware designed for harsh conditions and remote operations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineCar size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">3. Configure AI Workloads</h3>
            <p className="text-sm text-gray-300">
              Set up local AI processing, data analytics, and store-and-forward capabilities for your use case.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineCheckCircle size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">4. Monitor & Optimize</h3>
            <p className="text-sm text-gray-300">
              Real-time monitoring and continuous optimization to ensure maximum uptime and cost efficiency.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            onClick={handleContactUs}
          >
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
