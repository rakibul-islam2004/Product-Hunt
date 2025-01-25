import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from the API
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/featuredProducts"
        );

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setFeaturedProducts(response.data);
        } else {
          console.error(
            "Expected an array of products, but got:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-12 text-white text-center">
        <h1 className="text-4xl font-bold">Discover Amazing Tech Products</h1>
        <p className="mt-4 text-lg">
          Browse the best products, reviews, and innovations in tech.
        </p>
      </div>

      <section className="container mx-auto p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No featured products available at the moment.</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
