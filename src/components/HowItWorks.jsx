import React from "react";
import { AiOutlineForm, AiOutlineLock, AiOutlineCar, AiOutlineCheckCircle } from "react-icons/ai";

const HowItWorks = ({ onLaunchDemo }) => {
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
          Follow these steps to see how our platform delivers speed, transparency, and convenience.
          <br />
          Each step is designed to give you the most reliable and efficient delivery experience possible.
        </p>

        {/* Four-Column Steps */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Step 1 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineForm size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">1. Place Order</h3>
            <p className="text-sm text-gray-300">
              Quickly enter your delivery details using our easy-to-use order form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineLock size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">2. Track on Blockchain</h3>
            <p className="text-sm text-gray-300">
              Every delivery is securely recorded, offering full transparency and peace of mind.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineCar size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">3. See AI Route</h3>
            <p className="text-sm text-gray-300">
              Compare our optimized route to a standard route and see how you save time and costs.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#1C1C1C] p-6 rounded-md text-center flex flex-col items-center">
            <AiOutlineCheckCircle size={40} className="mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">4. Save Time</h3>
            <p className="text-sm text-gray-300">
              Enjoy faster, hassle-free deliveries with real-time updates in your dashboard.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            onClick={onLaunchDemo}
          >
            Launch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
