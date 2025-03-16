import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ Import Navbar
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
            {/* ✅ Use Navbar Component */}
            <Navbar />

            {/* ✅ Hero Section */}
            <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center py-16">
                <h2 className="text-5xl font-bold">Welcome to E-Shop</h2>
                <p className="text-lg mt-4">Discover amazing deals and top-quality products!</p>
                <Link to="/">
                    <button className="mt-6 bg-gray-200 dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                        Shop Now
                    </button>
                </Link>
            </header>

            {/* ✅ Featured Categories */}
            <section className="container mx-auto px-6 py-12">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">Featured Categories</h3>
                <Categories />
            </section>

            {/* ✅ Product List */}
            <section className="container mx-auto px-6 pb-12">
                <ProductList />
            </section>

            {/* ✅ Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 text-center mt-12">
                <p>© 2025 E-Shop. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
