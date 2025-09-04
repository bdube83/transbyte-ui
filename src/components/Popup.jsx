import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import OrderForm from "./OrderForm";
import BlockchainLog from "./BlockchainLog";
import RouteAnimation from "./RouteAnimation";
import LiveDashboard from "./LiveDashboard";
import ChatThinking from "./ChatThinking";

const Popup = ({ onClose, initialStep = 0 }) => {
  const [step, setStep] = useState(initialStep);
  const [order, setOrder] = useState(null);

  const handleOrderPlaced = (orderData) => {
    setOrder(orderData);
    setStep(2); // Proceed to ChatThinking
  };

  const handleSignUp = () => {
    onClose();
    window.location.href = "#early-access";
  };

  const handleContactUs = () => {
    onClose();
    window.location.href = "#contact-us";
  };

  // Tracks the AI step from ChatThinking
  const [aiStepFromChild, setAiStepFromChild] = useState(0);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-[#1A1A1A] border border-gray-700 text-white p-10 rounded-md shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-xl font-bold"
        >
          ✕
        </button>

        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="text-center">
            <h2 className="text-xl font-bold">
              Reduce Data Costs by 60%, Improve Uptime by 99%
            </h2>
            <p className="mb-6 max-w-[450px] mx-auto leading-relaxed text-gray-300">
              Experience the power of edge computing with local AI processing, 
              rugged hardware, and store-and-forward capabilities for your operations.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep(1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Request Demo
              </button>
              <button
                onClick={handleSignUp}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Join Pilot Program
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Order Form */}
        {step === 1 && (
          <div className="text-center space-y-8">
            <OrderForm order={order} onOrderPlaced={handleOrderPlaced} />
          </div>
        )}

        {/* Step 2: ChatThinking + "Next" Button (now an icon) */}
        {step === 2 && (
          <div className="space-y-8 text-center">
            <ChatThinking
              order={order}
              onAiStepChange={(val) => setAiStepFromChild(val)}
            />
            <div>
              <button
                onClick={() => setStep(4)}
                disabled={aiStepFromChild < 3}
                title="Proceed to the next step"
                className={
                  (aiStepFromChild < 3
                    ? "bg-gray-500 cursor-not-allowed opacity-50 "
                    : "bg-blue-500 hover:bg-blue-700 ") +
                  " inline-flex items-center justify-center text-white font-bold py-2 px-6 rounded transition duration-200"
                }
              >
                {/* Icon for completion (check circle) */}
                <AiOutlineSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: LiveDashboard + SignUp/ContactUs */}
        {step === 4 && (
          <div className="space-y-8 text-center">
            <LiveDashboard order={order} />
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handleSignUp}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Join Pilot Program
              </button>
              <button
                onClick={handleContactUs}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
