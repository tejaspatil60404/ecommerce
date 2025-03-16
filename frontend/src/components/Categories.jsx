import { useState, useEffect } from "react";
import { fetchCategories } from "../api";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        getCategories();
    }, []);

    return (
        <section className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="text-white bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        {/* {category.image && (
                            <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        )} */}
                        <h4 className="text-xl font-semibold text-gray-100">{category.name}</h4>
                        <p className="text-gray-200 mt-2">{category.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
