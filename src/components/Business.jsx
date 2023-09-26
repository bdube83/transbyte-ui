import { features } from "../constants";
import styles, { layout } from "../style";
import Search from "./Search";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () =>  (
  <section id="features" className={layout.section}>
      <div className={`${layout.sectionInfo} flex`}>
        <h2 className={styles.heading2}>
          Get started in a few easy
          steps.
        </h2>
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
          We enable last-mile delivery businesses to accept and track their deliveries using SMS, USSD, WhatsApp and more.
          How it works...
        </p>
        <p className={`${styles.InputParagraph} max-w-[600px] mt-5`}>
          1. Send your customer an SMS/WhatsApp message about their pending delivery using our APIs or dashboard
        </p>
        <p className={`${styles.InputParagraph} max-w-[600px] mt-5`}>
          2. Your customer uses our USSD code (*120*...#)/WhatsApp to select their desired drop off time
        </p>
        <p className={`${styles.InputParagraph} max-w-[600px] mt-5`}>
          3. We then send the request to you and your driver using our APIs and dashboard
        </p>
        <div className="ss:flex md:mr-4 mr-0">
          <br className="sm:block" />
        </div>
        <div className={`z-[10] ss:flex md:mr-4 mr-0`}>
            <Search />
        </div>
      </div>

      <div className={`z-[10] ${layout.sectionImg} flex-col`}>
        <video width="320" height="240" controls>
          <source src="/ussd_pitch.mov" type='video/mp4' />
        </video>
      </div>
  </section>
);

export default Business;
