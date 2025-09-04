import React from "react";
import styles, { layout } from "../style";
import { women_package } from "../assets";
import Search from "./Search";

const Business = ({ onLaunchDemo }) => {
  return (
    <section
      id="demo"
      // Ensure full viewport height and a flex layout to center content vertically
      className={`${layout.section} min-h-screen flex items-center justify-center`}
    >
      <div className={`${layout.sectionInfo} w-full`}>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Left Column: Image */}
          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img
              src={women_package}
              alt="Friendly Delivery"
              className="w-full h-full relative z-[5] object-cover"
            />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          </div>

          {/* Right Column: Text & Search */}
          <div className="flex-1 md:pl-10 mt-6 md:mt-0 text-center md:text-left">
            <h2 className={`${styles.heading2} text-white`}>
              Making Delivery Easy for Everyone
            </h2>
            <p className={`${styles.paragraph} mt-4 text-white max-w-[470px] mx-auto md:mx-0`}>
              We know waiting for your package can be stressful. Our friendly solution
              uses smart technology to keep you updated at every step—so you can relax
              and enjoy your day.
            </p>
            <div className="mt-6">
              <Search onLaunchDemo={onLaunchDemo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
