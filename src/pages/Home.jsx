import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import TrendingProducts from "../components/TrendingProducts";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false); // Start as false to avoid unnecessary spinner

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoadingFeatured(true); // Set loading state
        const response = await axios.get(
          "http://localhost:5000/featuredProducts"
        );

        if (Array.isArray(response.data)) {
          setFeaturedProducts(response.data); // Update products
        } else {
          console.error(
            "Expected an array of products, but got:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setIsLoadingFeatured(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleTrendingLoaded = () => {
    setIsLoadingTrending(false); // Stop trending spinner
  };

  const handleTrendingStart = () => {
    setIsLoadingTrending(true); // Start trending spinner
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-12 text-white text-center">
        <h1 className="text-4xl font-bold">Discover Amazing Tech Products</h1>
        <p className="mt-4 text-lg">
          Browse the best products, reviews, and innovations in tech.
        </p>
      </div>

      {/* Featured Products Section */}
      <section className="container mx-auto p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Hand-picked selection of the best tech products you need to explore
          today.
        </p>
        {isLoadingFeatured ? (
          <div className="flex justify-center">
            <ClipLoader color="#4A90E2" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No featured products available at the moment.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Trending Products Section */}
      <TrendingProducts
        onLoadingStart={handleTrendingStart}
        onLoadingEnd={handleTrendingLoaded}
      />
      {isLoadingTrending && (
        <div className="flex justify-center mt-4">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
