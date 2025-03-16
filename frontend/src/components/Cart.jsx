import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, fetchProductDetails, updateCartItem, removeCartItem } from "../api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const data = await fetchCartItems();
    if (Array.isArray(data) && data.length > 0) {
      setCart(data[0]);
      const productDetails = await Promise.all(
        data[0].cart_items.map(async (item) => {
          const productData = await fetchProductDetails(item.product);
          return { [item.product]: productData };
        })
      );
      setProducts(Object.assign({}, ...productDetails));
    } else {
      setCart({ cart_items: [], total_price: 0 });
    }
    setLoading(false);
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    await updateCartItem(item.id, newQuantity);
    loadCart();
  };

  const handleRemoveItem = async (itemId) => {
    setLoading(true);
    await removeCartItem(itemId);
    loadCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!cart) return <div className="text-center py-20 text-xl text-gray-700 dark:text-gray-300">Loading...</div>;

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-b pb-4">🛒 My Cart</h2>

        {cart.cart_items.length > 0 ? (
          <>
            <div className="mt-6 space-y-6">
              {cart.cart_items.map((item) => {
                const product = products[item.product];
                return (
                  <div key={item.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl shadow-md">
                    {product ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image_url || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-lg"
                        />
                        <div>
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                          <p className="text-gray-700 dark:text-gray-300">₹{product.price} each</p>
                          <p className="font-semibold text-gray-900 dark:text-white">Subtotal: ₹{item.subtotal_price}</p>
                        </div>
                      </div>
                    ) : (
                      "Loading product details..."
                    )}

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-400 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition"
                      >
                        −
                      </button>
                      <span className="text-xl font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-400 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total Price & Checkout */}
            <div className="mt-8 text-right">
              <p className="text-xl font-bold text-gray-900 dark:text-white">Total: ₹{cart.total_price}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 px-6 py-3 text-xl bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-800 dark:text-gray-300 mt-6">Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

export default Cart;
