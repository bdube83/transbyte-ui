import React, { useState } from "react";
import styles from "../style";
import CalendlyButton from "./CalendlyButton";
import { FaCheckCircle, FaClock, FaChartLine, FaShieldAlt, FaTools, FaRocket, FaHeadset } from "react-icons/fa";

const PilotProgram = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const pilotPlans = [
    {
      id: "basic",
      name: "Basic Pilot",
      duration: "30 days",
      deposit: "R2,500",
      scope: "Single location, up to 4 cameras",
      features: [
        "EdgeBox One device",
        "Basic AI analytics setup",
        "Performance monitoring dashboard",
        "Weekly check-ins",
        "Email support"
      ],
      kpis: [
        "Network bandwidth reduction: 30-50%",
        "Response time improvement: 40-60%", 
        "Uptime target: 95%",
        "Alert accuracy: 85%+"
      ]
    },
    {
      id: "standard",
      name: "Standard Pilot",
      duration: "60 days",
      deposit: "R5,000",
      scope: "Multi-location, up to 12 cameras",
      features: [
        "2x EdgeBox One devices",
        "Advanced AI analytics suite",
        "Custom alert configuration",
        "Bi-weekly optimization sessions",
        "Phone & email support",
        "Performance reporting"
      ],
      kpis: [
        "Network bandwidth reduction: 50-70%",
        "Response time improvement: 60-80%",
        "Uptime target: 97%",
        "Alert accuracy: 90%+",
        "ROI demonstration within 45 days"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Pilot",
      duration: "90 days",
      deposit: "R10,000",
      scope: "Full facility, unlimited cameras",
      features: [
        "3+ EdgeBox One devices",
        "Complete AI analytics platform",
        "Custom integration development",
        "Weekly strategic reviews",
        "Dedicated support engineer",
        "Comprehensive ROI analysis",
        "Migration planning"
      ],
      kpis: [
        "Network bandwidth reduction: 70-80%",
        "Response time improvement: 80%+",
        "Uptime target: 99%",
        "Alert accuracy: 95%+",
        "Demonstrated cost savings within 60 days",
        "Full integration roadmap"
      ]
    }
  ];

  return (
    <div className={`${styles.paddingX} bg-primary min-h-screen text-white py-16`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            EdgeBox Pilot Program
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prove the value of edge AI in your environment with our comprehensive pilot program. 
            <span className="text-blue-400 font-semibold"> Fully refundable deposit</span> and 
            measurable results guaranteed.
          </p>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center mt-6 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
            <FaShieldAlt className="text-green-400 mr-2" />
            <span className="text-green-300 text-sm font-medium">100% Refundable • POPIA Compliant • Enterprise Security</span>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-3">
            <FaTools className="text-orange-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Prototype Technology Notice</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                EdgeBox is cutting-edge prototype technology currently in advanced development. 
                While performance metrics are based on controlled testing, <strong>results may vary</strong> depending 
                on your specific environment, network conditions, and use case requirements. 
                Our pilot program is designed to validate performance in real-world conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Why Pilot Program */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join Our Pilot Program?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <FaRocket className="text-blue-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Early Access</h3>
              <p className="text-gray-300 text-sm">Be among the first to deploy next-generation edge AI technology</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <FaChartLine className="text-green-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Proven ROI</h3>
              <p className="text-gray-300 text-sm">Demonstrate cost savings and efficiency gains before full deployment</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <FaHeadset className="text-purple-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-300 text-sm">Direct access to our engineering team throughout the pilot</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <FaShieldAlt className="text-orange-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Risk-Free</h3>
              <p className="text-gray-300 text-sm">100% refundable deposit with no long-term commitments</p>
            </div>
          </div>
        </section>

        {/* Pilot Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Pilot Scope</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {pilotPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-gray-800/50 p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.id === 'standard' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{plan.deposit}</div>
                  <div className="text-gray-400 text-sm">Refundable deposit</div>
                  <div className="flex items-center justify-center mt-2 text-sm text-gray-300">
                    <FaClock className="mr-1" />
                    {plan.duration}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-blue-400">Scope</h4>
                  <p className="text-gray-300 text-sm">{plan.scope}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-blue-400">Includes</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <FaCheckCircle className="text-green-400 mr-2 flex-shrink-0" size={12} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-blue-400">Target KPIs</h4>
                  <ul className="space-y-2">
                    {plan.kpis.map((kpi, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <FaChartLine className="text-blue-400 mr-2 flex-shrink-0" size={12} />
                        {kpi}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Pilot Process & Timeline</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Discovery Call</h3>
              <p className="text-gray-300 text-sm">30-min consultation to understand your requirements</p>
              <div className="text-xs text-blue-400 mt-2">Week 0</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Setup & Deploy</h3>
              <p className="text-gray-300 text-sm">EdgeBox installation and configuration at your site</p>
              <div className="text-xs text-blue-400 mt-2">Week 1-2</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Monitor & Optimize</h3>
              <p className="text-gray-300 text-sm">Continuous monitoring with regular optimization sessions</p>
              <div className="text-xs text-blue-400 mt-2">Throughout pilot</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Results & Planning</h3>
              <p className="text-gray-300 text-sm">Comprehensive report with expansion recommendations</p>
              <div className="text-xs text-blue-400 mt-2">Final week</div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Success Looks Like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
              <FaChartLine className="text-green-400 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Bandwidth Savings</h3>
              <p className="text-2xl font-bold text-green-400 mb-1">30-80%</p>
              <p className="text-gray-300 text-sm">Reduction in network bandwidth usage vs cloud processing</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
              <FaClock className="text-blue-400 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-2xl font-bold text-blue-400 mb-1">&lt;100ms</p>
              <p className="text-gray-300 text-sm">Local processing eliminates cloud latency</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
              <FaShieldAlt className="text-purple-400 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Uptime Target</h3>
              <p className="text-2xl font-bold text-purple-400 mb-1">95-99%</p>
              <p className="text-gray-300 text-sm">Reliable operation even during connectivity issues</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Pilot?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join South Africa's leading logistics and mining companies who are already testing EdgeBox. 
            Schedule a call with our founder to discuss your specific requirements.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <CalendlyButton 
              text="Schedule Discovery Call"
              variant="primary"
              size="large"
              className="min-w-[200px]"
            />
            <a 
              href="#early-access" 
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors min-w-[200px]"
            >
              Quick Sign Up
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>Questions? Email <a href="mailto:bongani@edgebox.africa" className="text-blue-400 hover:underline">bongani@edgebox.africa</a> or call +27 (0)XX XXX XXXX</p>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PilotProgram;
