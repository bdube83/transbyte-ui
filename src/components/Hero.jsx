import styles, { layout } from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import Search from "./Search";
import Counter from "./Counter";

const Hero = () => {
  return (
    <section id="home" className={layout.section}>
      <div className={layout.sectionInfo}>

        {/* gradient start */}
        <div className="absolute z-[1] w-[10%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[2] w-[10%] h-[1%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[1] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}

        <div className="flex flex-row justify-between">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[50px] text-[50px] text-white ss:leading-[70.8px] leading-[75px]">
          Last-mile Delivery Management Software For {" "}
            <span className="text-gradient">African</span>{" "} Businesses
          </h1>
        </div>
      </div>

    </section>
  );
};

export default Hero;
