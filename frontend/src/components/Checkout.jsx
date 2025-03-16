import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchCartItems,
  fetchProductDetails,
  placeOrder,
  saveShippingAddress,
} from "../api";

// Message Component
const Message = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`z-50 fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message}
      </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newAddress, setNewAddress] = useState({
    address_line_1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const product_id = location.state?.product_id;
  const [quantity, setQuantity] = useState(location.state?.quantity || 1);

  useEffect(() => {
    if (product_id) {
      loadProduct();
    } else {
      loadCart();
    }
  }, [product_id]);

  const loadProduct = async () => {
    try {
      const productData = await fetchProductDetails(product_id);
      setProduct(productData);
      setTotalPrice(productData.price * quantity);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const loadCart = async () => {
    try {
      const response = await fetchCartItems();
      if (Array.isArray(response) && response.length > 0) {
        const cartData = response[0];
        const cartItems = cartData.cart_items || [];

        const products = await Promise.all(
          cartItems.map(async (item) => {
            const productData = await fetchProductDetails(item.product);
            return { ...item, productDetails: productData };
          })
        );

        setCart(products);
        setTotalPrice(cartData.total_price || 0);
      } else {
        setCart([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!newAddress.address_line_1 || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      setMessage({ type: "error", text: "❌ Please enter all required shipping address fields." });
      return;
    }

    setLoading(true);
    try {
      const orderResponse = await placeOrder({
        total_price: totalPrice,
        status: "pending",
      });

      if (!orderResponse.order_id) {
        setMessage({ type: "error", text: "❌ Error: Order ID not generated." });
        setLoading(false);
        return;
      }

      const orderId = orderResponse.order_id;
      await saveShippingAddress({ ...newAddress, order_id: orderId });

      setMessage({ type: "success", text: "🎉 Order placed successfully!" });
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      setMessage({ type: "error", text: "Error placing order. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gray-900 text-white">
      <Message type={message.type} message={message.text} onClose={() => setMessage({ type: "", text: "" })} />
      
      <div className="w-full max-w-6xl bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-200">Checkout</h2>

        {/* Product or Cart Display */}
        <div className="bg-gray-700 p-6 rounded-md shadow-md mb-6">
          <h3 className="text-gray-300 text-2xl font-semibold mb-4">
            {product_id ? "Product Details" : "My Cart"}
          </h3>

          {product_id ? (
            <div className="flex items-center gap-8 border border-gray-600 p-6 rounded-md bg-gray-800 shadow-sm">
              <img
                src={product?.image_url}
                alt={product?.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-gray-200 font-semibold text-2xl">{product?.name}</p>
                <p className="text-gray-400 text-sm mb-2">{product?.description || "No description available"}</p>
                <p className="text-green-400 font-bold text-xl">₹{product?.price}</p>
              </div>
            </div>
          ) : cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-8 border border-gray-600 p-6 rounded-md mb-4 bg-gray-800 shadow-sm"
              >
                <img
                  src={item.productDetails?.image_url}
                  alt={item.productDetails?.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-gray-200 font-semibold text-2xl">{item.productDetails?.name}</p>
                  <p className="text-gray-400 text-sm mb-2">
                    {item.productDetails?.description || "No description available"}
                  </p>
                  <p className="text-green-400 text-lg font-medium">
                    ₹{item.productDetails?.price} x {item.quantity}
                  </p>
                  <p className="text-green-500 font-bold text-lg">Subtotal: ₹{item.subtotal_price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No items in cart.</p>
          )}
          <p className="text-gray-200 text-2xl font-bold mt-3 text-right">Total: ₹{totalPrice}</p>
        </div>

        {/* Shipping Address */}
        <div className="p-6 bg-gray-700 rounded-md shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-300">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="address_line_1"
              value={newAddress.address_line_1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address_line_1: e.target.value })
              }
              placeholder="Address Line 1"
              className="border p-4 rounded w-full bg-gray-900 text-white border-gray-600 focus:ring"
            />
            <input
              name="city"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              placeholder="City"
              className="border p-4 rounded w-full bg-gray-900 text-white border-gray-600 focus:ring"
            />
            <input
              name="state"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              placeholder="State"
              className="border p-4 rounded w-full bg-gray-900 text-white border-gray-600 focus:ring"
            />
            <input
              name="pincode"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
              placeholder="Pincode"
              className="border p-4 rounded w-full bg-gray-900 text-white border-gray-600 focus:ring"
            />
          </div>
        </div>

        <button onClick={handlePlaceOrder} disabled={loading} className="mt-6 px-6 py-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition w-full shadow-md">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
