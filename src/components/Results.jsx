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
    const [setButtonPopup] = useState(false);
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
                <div className={`${styles.boxWidth}`}>
                    <div className="flex flex-row justify-between items-center text-center">
                        <h1 className="flex-1 font-poppins font-semibold ss:text-[20px] text-[20px] text-white ss:leading-[70.8px] leading-[75px]">
                        Search results
                        </h1>
                    </div>
                    <section className="p-5 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:px-20 font_sans">
                        <div className="bg-gray-200 rounded-lg">
                            {console.log(state.data)}
                            <Popup trigger={ state.data ? true : false} setTrigger={setButtonPopup}>
                                <h3>My popup</h3>
                            </Popup>
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
