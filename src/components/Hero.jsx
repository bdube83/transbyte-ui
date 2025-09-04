import React from "react";
import styles, { layout } from "../style";
import { robot } from "../assets";
import GetStarted from "./GetStarted";

const Hero = ({ onLaunchDemo }) => {
  return (
    <section
      id="home"
      className={`flex flex-col md:flex-row items-center justify-center bg-primary min-h-screen ${styles.paddingX}`}
    >
      {/* Left (Text) Column */}
      <div className="flex-1 text-left">
        <h1 className="font-poppins font-semibold text-[40px] md:text-[50px] text-white leading-[1.2]">
          Delivering Packages, <br className="hidden md:block" />
          <span className="text-gradient">Made Simple</span>
        </h1>
        <p className={`${styles.paragraph} mt-4 text-white max-w-[470px]`}>
          We help everyday businesses and neighborhoods get your orders where
          they need to go—fast, safe, and without the hassle.
        </p>
        <div className="mt-6">
          <GetStarted onLaunchDemo={onLaunchDemo} />
        </div>
      </div>

      {/* Right (Image) Column */}
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={robot} alt="Friendly Delivery" className="w-full h-full relative z-[5]" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
       </div>
    </section>
  );
};

export default Hero;
