import styles from "../style";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Business from "./Business";
import Billing from "./Billing";
import CardDeal from "./CardDeal";
import Testimonials from "./Testimonials";
import Clients from "./Clients";
import CTA from "./CTA";
import Footer from "./Footer";

const Home = () => (
    <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <Business />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* remove for now
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
        */}
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;
