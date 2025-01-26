import { useState, useEffect } from "react";
import axios from "axios";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/products/featured"
        );
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/products/trending"
        );
        setTrendingProducts(response.data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchAllProducts();
    fetchFeaturedProducts();
    fetchTrendingProducts();
  }, []);

  return {
    products,
    featuredProducts,
    trendingProducts,
    loading,
  };
};

export default useProduct;
