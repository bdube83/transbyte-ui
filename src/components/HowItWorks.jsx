import React from "react";
import styles from "../style";
import { edgeboxDevice } from "../assets";

const HowItWorks = ({ onLaunchDemo }) => {
  const handleContactUs = () => {
    window.location.href = "#contact-us";
  };

  const steps = [
    {
      title: "Deploy EdgeBox",
      description: "Install our Edgebox One device at your site with minimal setup"
    },
    {
      title: "Ingest Data",
      description: "Connect CCTV cameras, telematics and sensors, EdgeBox One ingests data streams on-site"
    },
    {
      title: "Process Locally",
      description: "AI analytics run locally on EdgeBox One, no internet required"
    },
    {
      title: "Smart Sync",
      description: "Only compressed summaries and alerts sync to cloud when connectivity is available"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How EdgeBox Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Deploy rugged edge AI that works offline-first, processes data locally, and syncs intelligently to the cloud
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          
          {/* EdgeBox Device Visual */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Device showcase */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <img
                  src={edgeboxDevice}
                  alt="EdgeBox One - How it works"
                  className="w-full h-auto max-w-sm mx-auto"
                />
                
                {/* Data flow indicators */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                  AI Processing
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Offline-First
                </div>
              </div>


            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-800/20 rounded-lg border border-gray-700">
            <div className="text-2xl mb-3">🏭</div>
            <h4 className="font-semibold mb-2">Logistics & Depots</h4>
            <p className="text-sm text-gray-400">Intrusion detection, gate monitoring, dwell-time analytics</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/20 rounded-lg border border-gray-700">
            <div className="text-2xl mb-3">⛏️</div>
            <h4 className="font-semibold mb-2">Mining Operations</h4>
            <p className="text-sm text-gray-400">Worker safety monitoring, equipment anomaly detection</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/20 rounded-lg border border-gray-700">
            <div className="text-2xl mb-3">🚢</div>
            <h4 className="font-semibold mb-2">Ports & Yards</h4>
            <p className="text-sm text-gray-400">Container tracking, cargo security, efficiency optimization</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
            onClick={handleContactUs}
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;