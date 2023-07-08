import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import Search from "./Search";
import Counter from "./Counter";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 text-center`}>

        {/* gradient start */}
        <div className="absolute z-[1] w-[10%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[2] w-[10%] h-[1%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[1] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}

        <div className="flex flex-row justify-between items-center">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[52px] text-white ss:leading-[70.8px] leading-[75px]">
            Find and {" "}
            <span className="text-gradient">book</span>{" "} courier providers.
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[52px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          
        </h1>
        
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
          Our platform uses AI to identify the courier providers most likely to fit your needs.
        </p>

        <div className="ss:flex md:mr-4 mr-0">
          <br className="sm:block" />
        </div>
        <div className="z-[10] ss:flex md:mr-4 mr-0">
            <Search />
          </div>
      </div>




    </section>
  );
};

export default Hero;
