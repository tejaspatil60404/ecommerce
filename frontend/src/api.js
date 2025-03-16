import axios from "axios";

// Base API URL
const API_URL = "http://127.0.0.1:8000/api/";

// Get tokens from local storage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Create an Axios instance with authentication headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request headers dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access tokens by refreshing them
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}auth/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          // Retry the original request with new access token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logoutUser();
        }
      } else {
        logoutUser();
      }
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const loginUser = async (phone, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login/`, { phone, password });

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("auth/register/", userData);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("auth/user/");
  return response.data;
};

// Shipping Address APIs
export const fetchUserAddress = async () => {
  try {
    const response = await axiosInstance.get("shipping-address/");
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping address:", error);
    return null;
  }
};

export const saveShippingAddress = async (addressData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}shipping-address/`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error saving shipping address:", error.response?.data || error);
    throw error;  // This will now only throw errors if there’s a real problem
  }
};

// Product APIs
export const fetchProducts = async () => {
  const response = await axiosInstance.get("products/");
  return response.data;
};

// Fetch product details
export const fetchProductDetails = async (productId) => {
  const response = await axiosInstance.get(`products/${productId}/`);
  return response.data;
};

// Fetch product reviews
export const fetchReviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}products/${productId}/reviews/`);

    if (!response.ok) {
      throw new Error("Failed to fetch reviews.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Category API
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("categories/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Cart APIs
// Fetch Cart
export const fetchCartItems = async () => {
  try {
    const response = await axiosInstance.get("cart/");
    console.log("Cart API Response:", response.data);  // Debugging log
    return response.data || { cart_items: [], total_price: 0 };
  } catch (error) {
    console.error("Error fetching cart:", error.response?.data || error.message);
    return { cart_items: [], total_price: 0 }; // Prevent undefined state
  }
};

// Add to Cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await axiosInstance.post("cart/add/", { product: productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    throw error;
  }
};

// Update Cart Item Quantity
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await axiosInstance.put(`cart/update/${cartItemId}/`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.response?.data || error.message);
    throw error;
  }
};

// Remove from Cart
export const removeCartItem = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(`cart/remove/${cartItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error.response?.data || error.message);
    throw error;
  }
};

// Orders API
export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get("orders/my-orders/");
    console.log("Fetched Orders:", response.data); // Check if order_items exist
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const placeOrder = async (totalPrice, cartCheckout = true, selectedProduct = null) => {
  try {
    const response = await axiosInstance.post("place-order/", {
      total_price: totalPrice,
      cart_checkout: cartCheckout,
      selected_product: selectedProduct,
    });
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw error;
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

export const placeOrderDirect = async ({ product_id, quantity }) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("Token being sent:", token);  // Debugging line

    const response = await axiosInstance.post("order/direct/", {
      product_id,
      quantity,
    });

    return response.data;
  } catch (error) {
    console.error("Error placing direct order:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Wishlist Items
export const fetchWishlist = async () => {
  try {
    const response = await axios.get(`${API_URL}wishlist/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Add Product to Wishlist
export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(
      `${API_URL}wishlist/add/`,
      { product: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove Product from Wishlist
export const removeFromWishlist = async (wishlistId) => {
  try {
    const response = await axios.delete(`${API_URL}wishlist/remove/${wishlistId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};