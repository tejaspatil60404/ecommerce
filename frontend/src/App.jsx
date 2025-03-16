import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx";
import ProductList from "./components/ProductList.jsx";
import Home from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./components/Checkout.jsx";
import Orders from "./components/Orders.jsx";
import Wishlist from "./components/Wishlist.jsx";
import OrdersPage from "./pages/OrderPage.jsx";
import MyOrders from "./pages/OrderPage.jsx";
import About from "./pages/AboutPage.jsx";
import Contact from "./pages/ContactPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={< CartPage/>} />
        <Route path="/checkout" element={< Checkout/>} />
        <Route path="/orders" element={< MyOrders/>} />
        <Route path="/wishlist" element={< Wishlist/>} />
        <Route path="/about" element={< About/>} />
        <Route path="/contact" element={< Contact/>} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
