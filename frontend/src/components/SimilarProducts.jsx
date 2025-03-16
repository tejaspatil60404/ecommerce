import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api";

const SimilarProducts = ({ categoryName, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryName) return;
    
    fetchProducts().then((products) => {
      const filtered = products.filter(
        (product) => 
          product.category_name?.toLowerCase() === categoryName?.toLowerCase() && 
          product.id !== currentProductId
      );
      setSimilarProducts(filtered);
    });
  }, [categoryName, currentProductId]);

  // Handle navigation and scroll to top
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 🚀 Scroll to top smoothly
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Similar Products</h2>
      {similarProducts.length === 0 ? (
        <p className="text-gray-500">No similar products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow hover:scale-105 transition"
            >
              <img
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">{product.name}</h3>
              <p className="text-blue-500 font-medium">₹{product.price}</p>
              <button
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                onClick={() => handleViewDetails(product.id)} // 🚀 Call function to navigate and scroll
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
