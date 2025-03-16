import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("accessToken"); // Django DRF Token
        setIsLoggedIn(!!token);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        window.location.reload(); // Refresh page
    };

    return (
        <nav className="bg-gray-950 text-white shadow-lg sticky top-0 w-full h-16 z-50 flex items-center">
            <div className="container mx-auto px-6 flex items-center justify-between w-full">
                {/* Logo */}
                <Link to="/" className="text-gray-100 text-2xl font-bold tracking-wide hover:text-green-500 transition">
                    E-Shop
                </Link>

                {/* Navigation Links - Centered */}
                <div className="flex items-center justify-center space-x-8 text-lg">
                    <Link to="/" className="text-gray-300 hover:text-green-400 transition">Home</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/orders" className="text-gray-300 hover:text-green-400 transition">Orders</Link>
                            <Link to="/cart" className="text-gray-300 hover:text-green-400 transition">Cart</Link>
                            <Link to="/about" className="text-gray-300 hover:text-green-400 transition">About</Link>
                            <Link to="/contact" className="text-gray-300 hover:text-green-400 transition">Contact</Link>

                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="ml-4 bg-red-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/about" className="text-gray-300 hover:text-green-400 transition">About</Link>
                            <Link to="/contact" className="text-gray-300 hover:text-green-400 transition">Contact</Link>
                            <Link to="/login" className="text-gray-300 hover:text-green-400 transition">Login</Link>
                            <Link to="/register" className="text-gray-300 hover:text-green-400 transition">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
