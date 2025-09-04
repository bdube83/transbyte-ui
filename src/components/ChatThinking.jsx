import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import RouteAnimation from "./RouteAnimation";
import RadarCircularScanner from "./RadarCircularScanner";

const ChatThinking = ({ order, onAiStepChange }) => {
  const [aiStep, setAiStep] = useState(0);
  const [showRadar, setShowRadar] = useState(false);
  const [radarComplete, setRadarComplete] = useState(false);

  useEffect(() => {
    if (!order) return;
    const timer1 = setTimeout(() => setAiStep(1), 2000);
    const timer2 = setTimeout(() => setAiStep(2), 4000);
    const timer3 = setTimeout(() => {
      setAiStep(3);
      setShowRadar(true);
    }, 9000);
    // Wait extra time after radar completes before transitioning to final state
    const timer4 = setTimeout(() => {
      setAiStep(4);
      setShowRadar(false);
    }, 13000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [order]);

  useEffect(() => {
    if (onAiStepChange) onAiStepChange(aiStep);
  }, [aiStep, onAiStepChange]);

  if (!order) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-300">No order details found.</p>
      </div>
    );
  }

  let dynamicBubble = "";
  let dynamicThinking = false;
  if (aiStep === 0) {
    dynamicBubble = "Creating delivery using blockchain transaction...";
    dynamicThinking = true;
  } else if (aiStep === 1) {
    dynamicBubble = "Map loaded. Still analyzing data...";
    dynamicThinking = true;
  } else if (aiStep === 2) {
    dynamicBubble = "AI analyzing traffic & incidents...";
    dynamicThinking = true;
  } else if (aiStep === 3) {
    dynamicBubble = "Scanning for drivers...";
    dynamicThinking = true;
  }

  // Use a single instance of RouteAnimation.
  let routeMode;
  if (aiStep === 1) routeMode = "hidden";
  else if (aiStep === 2) routeMode = "drawSlowly";
  else if (aiStep >= 3) routeMode = "driver";
  else routeMode = "hidden";

  return (
    <div className="space-y-6" style={{ position: "relative" }}>
      <div className="flex flex-col space-y-4">
        <div className="bg-[#2E2E2E] text-[#E1E1E1] p-3 rounded-lg max-w-[80%] w-fit self-end">
          <p className="text-sm font-semibold">{order.email}</p>
          <p className="text-sm">{order.toAddress}</p>
        </div>
        {aiStep !== 4 && (
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%] w-fit self-start whitespace-pre-line">
            {dynamicThinking ? (
              <div className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                <p className="text-sm">{dynamicBubble}</p>
              </div>
            ) : (
              <p className="text-sm">{dynamicBubble}</p>
            )}
          </div>
        )}
        {aiStep === 4 && (
            <>
            <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%] w-fit self-start whitespace-pre-line">
              <p className="text-sm">
                Driver found! Route optimized!{"\n"}
                Time Saved: 15 minutes
              </p>
            </div>
          </>
        )}
      </div>
      <div className="mt-4" style={{ position: "relative" }}>
        <RouteAnimation order={order} mode={routeMode} radarComplete={radarComplete} />
        {showRadar && aiStep === 3 && (
          <RadarCircularScanner
            duration={2000} // Faster scan
            sweepColor="rgba(0,150,255,0.7)"
            backgroundColor="rgba(0,0,0,0.3)"
            onComplete={() => {
              // When radar completes, mark it complete.
              setRadarComplete(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatThinking;
