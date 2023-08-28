import styles from "../style";
import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs'
import Footer from "./Footer";
import Hero from "./Hero";
import Stats from "./Stats";
import CurrencyFormat from 'react-currency-format';

function Results() {
    const { state } = useLocation();
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
                        {state.data.map((item) => {
                        const { id, product, total_price, total_distance_km } = item
                
                        return (
                            <div key={id} className="bg-gray-200 rounded-lg">
                                {console.log(product.provider)}
                            <img src={product.provider.logo_url} alt={product.provider.logo_url} className="rounded-t-lg" />
                            <div className="flex items-center justify-between">
                                <div className="px-5">
                                <h2 className="font-bold mt-5">{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Size: {product.product_size.size}</p>
                                <p>Distance: {total_distance_km} km</p>
                                </div>
                
                                <div className="px-5">
                                <BsHeart title="Add to Wishlist" className="cursor-pointer" />
                                </div>
                            </div>
                            <div className="my-2 px-5">
                                <small className="bg-blue-500  rounded-full px-2 text-white tracking-widest mr-3">
                                {product.product_type.name}
                                </small>
                                <small className="bg-blue-500  rounded-full px-2 text-white tracking-widest mr-3">
                                {product.provider.name}
                                </small>
                            </div>
                            <p className="text-2xl px-5 pb-6">
                                <CurrencyFormat value={total_price/100} displayType={'text'} thousandSeparator={true} prefix={'R'} />
                            </p>
                            </div>
                        )
                        })}
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
