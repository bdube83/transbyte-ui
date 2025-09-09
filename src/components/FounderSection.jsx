import React from "react";
import styles from "../style";
import { founderBongani, linkedin } from "../assets";
import CalendlyButton from "./CalendlyButton";

const FounderSection = () => {
  return (
    <section id="about" className={`${styles.paddingY} ${styles.paddingX} bg-primary`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Founder Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={founderBongani}
                alt="Bongani Dube - Founder & CEO"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-gradient shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Founder & CEO
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h2 className={`${styles.heading2} text-gradient`}>
                Meet Your Technology Partner
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Bongani Dube</h3>
                <p className="text-blue-400 font-semibold">Founder & CEO, EdgeBox Technologies</p>
              </div>

              {/* Inspirational Quote */}
              <blockquote className="relative">
                <div className="absolute -top-2 -left-4 text-6xl text-blue-500/30 font-serif">"</div>
                <p className="text-lg italic text-gray-300 pl-8 pr-4">
                  "EdgeBox isn't just about AI, it's about bringing enterprise-grade computing 
                  power to every corner of Africa. We're not just connecting devices; we're connecting visions to reality."
                </p>
                <div className="absolute -bottom-2 -right-4 text-6xl text-blue-500/30 font-serif">"</div>
              </blockquote>

              {/* Professional Background */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-blue-400">Background</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• CSIR AI award recipient & multiple award winner</li>
                  <li>• FinTech, AWS EC2 infrastructure and cloud computing expertise</li>
                  <li>• University of Cape Town Computer Science graduate</li>
                </ul>
              </div>

              {/* Contact & Meeting CTA */}
              <div className="space-y-4">
                <p className="text-gray-300">
                  Ready to deploy EdgeBox at your location? Schedule a direct consultation with Bongani 
                  to discuss your specific needs and get a personalized solution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <CalendlyButton 
                    text="Meet with Bongani" 
                    variant="primary"
                    size="medium"
                    className="flex-1"
                  />
                  <div className="flex gap-3">
                    <a 
                      href="mailto:bongani@edgebox.africa"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      📧 Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/bongani-dube-86944479/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <img src={linkedin} alt="LinkedIn" className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">Trusted by forward-thinking organizations across Africa</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
