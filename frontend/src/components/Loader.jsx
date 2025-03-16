import React from "react";
import { ClipLoader } from "react-spinners"; // Using react-spinners

const Loader = ({ size = 50, color = "#007bff" }) => {
  return (
    <div className="loader-container">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
