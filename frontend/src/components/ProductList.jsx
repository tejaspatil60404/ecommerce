import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, addToCart } from "../api";
import Message from "./Message";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            try {
                await addToCart(productId);
                setMessage({ type: "success", text: "Product added to cart successfully!" });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            } catch (error) {
                console.error("Failed to add to cart:", error);
                setMessage({ type: "error", text: "Failed to add product to cart." });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 dark:bg-gray-900 min-h-screen">
            {message.text && <Message type={message.type} text={message.text} />}

            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
                Our Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-all transform hover:shadow-lg"
                    >
                        {/* Product Image */}
                        <div className="relative">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-56 object-cover rounded-t-2xl"
                            />
                            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Product Details */}
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                {product.description}
                            </p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                                ₹{product.price}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className="w-1/2 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="w-1/2 border border-blue-400 text-blue-500 dark:border-blue-500 dark:text-blue-400 font-semibold py-2 rounded-lg hover:border-blue-700 hover:text-white dark:hover:bg-blue-800 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
