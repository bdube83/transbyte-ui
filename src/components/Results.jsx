import styles from "../style";
import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs'
import Footer from "./Footer";
import Hero from "./Hero";
import Stats from "./Stats";
import CurrencyFormat from 'react-currency-format';
import Popup from "./Popup";
import { useState } from "react";

function Results() {
    const { state } = useLocation();
    const [buttonPopup, setButtonPopup] = useState(false);
    //setButtonPopup(state.data ? true : false);
    if (state === 'Error searching data'){
        return (
            <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>
        
            <div className={`bg-primary ${styles.flexStart}`}>
              <div className={`${styles.boxWidth}`}>
                <Hero />
                <div className="flex flex-row justify-between items-center text-center">
                        <h1 className="flex-1 font-poppins font-semibold ss:text-[20px] text-[20px] text-white ss:leading-[70.8px] leading-[75px]">
                        {state}... please try again later
                        </h1>
                </div>
              </div>
            </div>
            
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
              <Stats />
                <Footer />
              </div>
            </div>
          </div>
        )
    }
    return (
        <>
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className={`bg-primary ${styles.flexStart}`}>
            <div>
              <section className="text-white body-font relative">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
                      Contact Us
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      We would love to hear from you!
                    </p>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label for="name" className="leading-7 text-sm">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            for="email"
                            className="leading-7 text-sm"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <label
                            for="message"
                            className="leading-7 text-sm"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                          ></textarea>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <button className="flex mx-auto bg-blue-700 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            </div>
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
        </>
      )
}

export default Results;
