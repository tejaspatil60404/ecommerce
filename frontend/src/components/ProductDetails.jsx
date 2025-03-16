import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails, addToCart, placeOrderDirect, addToWishlist, removeFromWishlist, fetchWishlist } from "../api";
import Message from "../components/Message"; // ✅ Import Message component

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" }); // ✅ State for messages

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductDetails(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const getWishlist = async () => {
            try {
                const wishlistData = await fetchWishlist();
                setWishlist(wishlistData);
                setIsWishlisted(wishlistData.some(item => item.product.id === parseInt(productId)));
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        getProduct();
        getWishlist();
    }, [productId]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(productId);
            showMessage("success", "Product added to cart successfully!"); // ✅ Show success message
        } catch (error) {
            console.error("Error adding to cart:", error);
            showMessage("error", "Failed to add to cart."); // ✅ Show error message
        }
    };

    const handleBuyNow = async () => {
        try {
            const orderResponse = await placeOrderDirect({
                product_id: productId,
                quantity: 1
            });

            if (orderResponse.order_id) {
                navigate('/checkout', { state: { product_id: product.id, quantity: 1 } });
            } else {
                showMessage("error", "Failed to place order. Try again.");
            }
        } catch (error) {
            console.error("Error placing direct order:", error);
            showMessage("error", "Something went wrong while placing the order.");
        }
    };

    const handleWishlistToggle = async () => {
        try {
            if (isWishlisted) {
                const wishlistItem = wishlist.find(item => item.product.id === parseInt(productId));
                if (wishlistItem) {
                    await removeFromWishlist(wishlistItem.id);
                    setWishlist(wishlist.filter(item => item.id !== wishlistItem.id));
                    setIsWishlisted(false);
                    showMessage("success", "Removed from wishlist.");
                }
            } else {
                const addedItem = await addToWishlist(productId);
                if (addedItem && addedItem.id) {
                    setWishlist([...wishlist, addedItem]);
                    setIsWishlisted(true);
                } else {
                    console.error("Wishlist response does not contain an ID:", addedItem);
                    showMessage("error", "Failed to add to wishlist.");
                }
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            showMessage("error", "Failed to update wishlist.");
        }
    };

    if (!product) {
        return <div className="text-center py-20 text-xl text-gray-700 dark:text-gray-300">Loading...</div>;
    }

    return (
        <section className="container mx-auto px-6 py-12">
            {/* ✅ Message Component */}
            {message.text && <Message type={message.type} text={message.text} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex justify-center">
                    <img
                        src={product.image_url || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full max-w-sm object-cover rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-md">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">{product.description}</p>
                    <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-4">₹{product.price}</p>
                    <p className="text-md text-gray-800 dark:text-gray-400 mt-2">
                        Category: <span className="font-semibold">{product.category_name}</span>
                    </p>
                    <p className={`mt-3 text-lg font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                        {product.stock > 0 ? "✔ In Stock" : "✖ Out of Stock"}
                    </p>

                    <div className="mt-6 flex flex-col space-y-4">
                        <button
                            onClick={handleBuyNow}
                            className="px-6 py-3 text-xl bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all"
                        >
                            ⚡ Buy Now
                        </button>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="px-16 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all"
                            >
                                🛒 Add to Cart
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                className={`px-16 py-3 font-semibold rounded-full shadow-lg transition-all ${
                                    isWishlisted ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-300 text-gray-900 hover:bg-gray-500"
                                }`}
                            >
                                {isWishlisted ? "Added to Wishlist" : "❤️ Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
