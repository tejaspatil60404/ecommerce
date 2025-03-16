import React, { useEffect, useState } from "react";
import { fetchOrders, fetchUserAddress } from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState({});

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        console.log("Fetched orders:", data); // Debugging

        setOrders(Array.isArray(data) ? data : []); // Ensure orders is an array

        // Fetch shipping addresses
        const addressesData = await fetchUserAddress();
        const addressesMap = {};
        addressesData.forEach((addr) => {
          addressesMap[addr.order] = addr;
        });

        setAddresses(addressesMap);
      } catch (err) {
        setError(err.message || "Failed to load orders.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">My Orders</h2>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error} />
      ) : Array.isArray(orders) && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-300">Order ID: {order.id}</h3>
              <p className="text-gray-300">
                <strong>Status:</strong> {order.status} <br />
                <strong>Total Price:</strong> ₹{order.total_price} <br />
                <strong>Ordered On:</strong> {new Date(order.created_at).toLocaleDateString()}
              </p>

              <h4 className="text-lg font-semibold text-gray-300 mt-4">Items in Order:</h4>
              {Array.isArray(order.order_items) && order.order_items.length > 0 ? (
                <ul className="space-y-3 mt-2">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 bg-gray-700 p-4 rounded-md">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-gray-200">{item.product_name}</p>
                        <p className="text-green-400">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 mt-2">No items in this order.</p>
              )}

              {addresses[order.id] ? (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-300">Shipping Address:</h4>
                  <p className="text-gray-300">
                    {addresses[order.id].full_name}, {addresses[order.id].street_address},<br />
                    {addresses[order.id].city}, {addresses[order.id].state}, {addresses[order.id].pincode}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 mt-3">No shipping address available.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Message type="info" message="No orders found." />
      )}
    </div>
  );
};

export default Orders;
