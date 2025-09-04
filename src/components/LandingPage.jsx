import React from 'react';
import styles, { layout } from "../style";

function LandingPage({ onOrderPlaced }) {
  const handleClick = () => {
    const dummyOrder = { id: Date.now() };
    onOrderPlaced(dummyOrder);
  };

  return (
    <div className={`${layout.section} ${styles.boxWidth} text-center`}>
      <header>
        <h1 className={`${styles.heading2}`}>Reduce Data Costs by 60%, Improve Uptime by 99%</h1>
        <p className={`${styles.paragraph} mt-4`}>
          Leveraging edge computing & local AI for optimized operations in remote environments.
        </p>
      </header>
      <div className="flex justify-center mt-8">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleClick}
        >
          Request Demo & Site Assessment
        </button>
      </div>
    </div>
  );
}

export default LandingPage;