import React from "react";
import styles from "../style";

const SocialProof = () => {

  return (
    <section className={`${styles.paddingY} ${styles.paddingX} bg-primary`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Trusted by Leading <span className="text-gradient">South African Organizations</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            EdgeBox is backed by industry partnerships, academic research, and proven expertise 
            in enterprise-grade AI solutions.
          </p>
          <div className="mt-6">
            <a 
              href="/partners" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              View Our Partners & Network
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
