import React, { useState, useEffect } from "react";
import styles from "../style";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Business from "./Business";
import Popup from "./Popup";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import EarlyAccess from "./EarlyAccess";
import FounderSection from "./FounderSection";
import SocialProof from "./SocialProof";
import FloatingDemoButton from "./FloatingDemoButton";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupInitialStep, setPopupInitialStep] = useState(0);

  // Handle anchor links when navigating from other pages
  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          // Small delay to ensure the page has rendered
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };

    // Scroll on initial load and when hash changes
    scrollToAnchor();
    
    // Listen for hash changes
    window.addEventListener('hashchange', scrollToAnchor);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', scrollToAnchor);
    };
  }, []);

  // For the Hero section, start at step 0 (the intro screen)
  const handleLaunchDemoFromHero = () => {
    setPopupInitialStep(0);
    setIsPopupOpen(true);
  };

  // For the Business section, start at step 1 (skip the intro)
  const handleLaunchDemoFromBusiness = () => {
    setPopupInitialStep(1);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-primary w-full min-h-screen">
      {/* Navbar Section */}
      <div className={`${styles.flexCenter} ${styles.paddingX} pt-4`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero onLaunchDemo={handleLaunchDemoFromHero} />
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`how-it-works-bg ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HowItWorks onLaunchDemo={handleLaunchDemoFromBusiness}/>
        </div>
      </div>


      {/* Early Access Sign-Up Section */}
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <EarlyAccess onLaunchDemo={handleLaunchDemoFromHero} />
        </div>
      </div>

      {/* Business Section */}
      <div className={`feedback-bg ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Business onLaunchDemo={handleLaunchDemoFromBusiness} />
        </div>
      </div>

      {/* Founder Section */}
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <FounderSection />
        </div>
      </div>

      {/* Social Proof Section */}
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <SocialProof />
        </div>
      </div>


      {/* MVP Popup */}
      {isPopupOpen && <Popup onClose={handleClosePopup} initialStep={popupInitialStep} />}

      {/* Floating Demo Button */}
      <FloatingDemoButton />

      {/* Footer Section */}
      <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
