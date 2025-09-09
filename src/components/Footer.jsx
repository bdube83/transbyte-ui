import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
{/*     <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="transbytecourier"
          className="w-[266px] h-[72.14px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A platform to manage deliveries in Africa.
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div> */}

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2025 EdgeBox Africa. All Rights Reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <a 
            href="/privacy-policy"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Terms of Service
          </a>
          <a 
            href="/pilot-program"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Pilot Program
          </a>
          <a 
            href="/partners"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Partners
          </a>
          <a 
            href="/blog"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Blog
          </a>
          <a 
            href="mailto:support@edgebox.africa"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
