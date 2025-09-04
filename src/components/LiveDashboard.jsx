import React, { useState } from "react";

const LiveDashboard = ({ order }) => {
  // Example metrics (in a real app, you might pass these as props or fetch them)
  const [orderCount] = useState(1);       // For MVP demo, assuming one order
  const [timeSaved] = useState("15 minutes");

  // Feedback state
  const [feedback, setFeedback] = useState("");
  // Willingness-to-pay state
  const [willingToPay, setWillingToPay] = useState(null);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("User Feedback:", feedback);
    console.log("Willing to Pay:", willingToPay);
    // Integrate your submission logic here (e.g., send to backend)
    setFeedback("");
    setWillingToPay(null);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-bold mb-4">Live Dashboard</h2>
      <div className="p-4 border border-gray-300 rounded">
        <p>Orders Placed: {orderCount}</p>
        <p>Time Saved: {timeSaved}</p>
      </div>

      {/* Feedback Section */}
      <div>
        <h3 className="text-lg font-bold mb-2">Your Feedback</h3>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us about your experience..."
            rows="3"
            required
            className="w-full border border-gray-300 p-2 rounded text-black"
          />

          {/* Willingness to Pay */}
{/*           <div>
            <h3 className="text-lg font-bold mb-2">Would You Pay for This Service?</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="willingToPay"
                  value="yes"
                  onChange={(e) => setWillingToPay(e.target.value)}
                  checked={willingToPay === "yes"}
                  className="form-radio text-blue-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="willingToPay"
                  value="no"
                  onChange={(e) => setWillingToPay(e.target.value)}
                  checked={willingToPay === "no"}
                  className="form-radio text-blue-500"
                />
                <span>No</span>
              </label>
            </div>
          </div> */}

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveDashboard;
