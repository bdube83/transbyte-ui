import React, { useEffect, useState } from "react";

const BlockchainLog = ({ order }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (order) {
      // Simulate blockchain transaction logging
      setTimeout(() => {
        setTransaction({
          id: "0x" + Math.random().toString(16).substr(2, 8),
          timestamp: new Date().toLocaleString(),
          status: "Confirmed",
        });
      }, 1000);
    }
  }, [order]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Blockchain Transaction</h2>
      {transaction ? (
        <div className="p-4 border border-gray-300 rounded">
          <p>Transaction ID: {transaction.id}</p>
          <p>Timestamp: {transaction.timestamp}</p>
          <p>
            Status: {transaction.status}{" "}
            <span className="text-green-500">✓</span>
          </p>
        </div>
      ) : (
        <p>Logging transaction...</p>
      )}
    </div>
  );
};

export default BlockchainLog;
