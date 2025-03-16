import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-green-400">About Us</h2>
        <p className="text-lg text-gray-300 mt-6 text-center max-w-3xl mx-auto">
          Welcome to <span className="text-green-400 font-semibold">E-Shop</span>, your go-to destination for trendy, high-quality fashion.
          We are passionate about bringing you the latest styles that combine comfort, elegance, and affordability. 
          Our mission is to make fashion accessible to everyone while ensuring top-notch quality and sustainability.
        </p>

        {/* Our Story */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Our Story</h3>
            <p className="text-gray-300 mt-4">
              Founded in 2025, E-Shop started with a simple idea—bringing affordable yet stylish clothing to fashion enthusiasts. 
              Over the years, we have built a strong community of customers who value quality, style, and ethical fashion.
              With a dedicated team of designers and a keen eye for trends, we continue to redefine the shopping experience.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Why Choose Us?</h3>
            <ul className="mt-4 text-gray-300 list-disc list-inside">
              <li>✔ Trendy and stylish clothing curated for all seasons</li>
              <li>✔ High-quality materials at affordable prices</li>
              <li>✔ Fast and reliable nationwide delivery</li>
              <li>✔ Sustainable and ethical fashion practices</li>
              <li>✔ 24/7 customer support for a seamless shopping experience</li>
            </ul>
          </div>
        </div>

        {/* Sustainability and Commitment */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Sustainability & Ethics</h3>
            <p className="text-gray-300 mt-4">
              We believe in fashion that doesn’t harm the planet. Our commitment to sustainability includes using eco-friendly fabrics, 
              minimizing waste in production, and ensuring fair labor practices. We partner with ethical manufacturers and promote 
              responsible shopping habits.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-400">Our Customer Commitment</h3>
            <p className="text-gray-300 mt-4">
              At E-Shop, customers are at the heart of everything we do. We prioritize your needs, listen to your feedback, and continuously 
              improve our products and services. Your satisfaction is our top priority, and we strive to make every shopping experience delightful.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-center text-green-400">What Our Customers Say</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-300 italic">"E-Shop has completely transformed my wardrobe! The quality is amazing, and the designs are so trendy."</p>
              <p className="text-green-400 font-semibold mt-2">— Riya Sharma</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-300 italic">"Fast delivery, excellent customer service, and clothes that actually fit perfectly. Highly recommended!"</p>
              <p className="text-green-400 font-semibold mt-2">— Akash Mehta</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-300 italic">"Sustainable and stylish—what more could I ask for? I love E-Shop’s collection!"</p>
              <p className="text-green-400 font-semibold mt-2">— Jay Kapoor</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-center text-gray-400 py-4 mt-12">
        © 2025 E-Shop. All Rights Reserved.
      </footer>
    </div>
  );
};

export default About;
