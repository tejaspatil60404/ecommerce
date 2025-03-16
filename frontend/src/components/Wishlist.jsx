import React, { useEffect, useState } from "react";
import { fetchWishlist, removeFromWishlist } from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const data = await fetchWishlist();
        console.log("Wishlist Data:", data);
        setWishlist(data);
      } catch (err) {
        setError(err.message || "Failed to load wishlist.");
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlist(wishlist.filter((item) => item.id !== wishlistId)); // Remove item from UI
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Wishlist</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : wishlist.length > 0 ? (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card shadow-sm mb-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="card-text">Price: ₹{item.product.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Message variant="info">Your wishlist is empty.</Message>
      )}
    </div>
  );
};

export default Wishlist;
