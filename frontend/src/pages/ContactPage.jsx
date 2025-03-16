import { useState } from "react";
import Navbar from "../components/Navbar";
import Message from "../components/Message";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setAlert({ type: "error", text: "All fields are required!" });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setAlert({ type: "success", text: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setAlert(null), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      {alert && <Message type={alert.type} text={alert.text} />}

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-green-400">Contact Us</h2>
        <p className="text-lg text-gray-300 mt-4 text-center max-w-2xl mx-auto">
          Have questions, feedback, or need support? Get in touch with us. Our team is here to assist you.
        </p>

        {/* Contact Form */}
        <div className="mt-12 max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-400 mb-4">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Business Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Our Office</h3>
            <p className="text-gray-300 mt-2">123 Fashion Street, Mumbai, India</p>
            <p className="text-gray-300">Zip Code: 400001</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Customer Support</h3>
            <p className="text-gray-300 mt-2">📞 Phone: +91 98765 43210</p>
            <p className="text-gray-300">📧 Email: support@eshop.com</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-green-400">Follow Us</h3>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-gray-300 hover:text-green-400 transition">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-center text-gray-400 py-4 mt-12">
        © 2025 E-Shop. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Contact;
