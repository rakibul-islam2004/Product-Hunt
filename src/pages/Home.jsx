import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import TrendingProducts from "../components/TrendingProducts";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

// Hero Slider Content
const slides = [
  {
    title: "Discover Amazing Tech Products",
    description: "Browse the best products, reviews, and innovations in tech.",
  },
  {
    title: "Explore Cutting-Edge Tools",
    description:
      "Find the latest frameworks, SaaS products, and AI-driven solutions.",
  },
  {
    title: "Join a Thriving Tech Community",
    description: "Upvote, review, and share your favorite digital products.",
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoadingFeatured(true);
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/featuredProducts"
        );

        if (Array.isArray(response.data)) {
          setFeaturedProducts(response.data);
        } else {
          console.error("Expected an array, received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setIsLoadingFeatured(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Loading handlers for trending products
  const handleTrendingLoaded = () => setIsLoadingTrending(false);
  const handleTrendingStart = () => setIsLoadingTrending(true);

  return (
    <MainLayout>
      {/* Hero Slider */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="absolute text-white text-center px-4"
          >
            <h1 className="text-4xl font-bold">{slides[slideIndex].title}</h1>
            <p className="mt-4 text-lg">{slides[slideIndex].description}</p>
          </motion.div>
        </AnimatePresence>
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
