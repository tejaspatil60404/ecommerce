import React from "react";
import Navbar from "../components/Navbar";
import Orders from "../components/Orders";

const MyOrders = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Orders />
      </div>
    </div>
  );
};

export default MyOrders;
