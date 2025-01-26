import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch trending products
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/trendingProducts"
        );
        if (Array.isArray(response.data)) {
          setTrendingProducts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="container mx-auto p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Trending Products</h2>
      <p className="text-center text-gray-600 mb-8">
        Check out the most popular tech products that everyone is talking about.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingProducts.length > 0 ? (
          trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-3">
            No Trending Products available at the moment.
          </p>
        )}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
