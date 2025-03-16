import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductDetail from "../components/ProductDetails";
import SimilarProducts from "../components/SimilarProducts";
import { fetchProductDetails } from "../api";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <ProductDetail />
      <SimilarProducts currentProductId={product.id} categoryName={product.category_name} />
    </>
  );
};

export default ProductDetailsPage;
