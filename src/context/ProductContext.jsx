import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
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

    fetchFeaturedProducts();
    fetchTrendingProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, featuredProducts, trendingProducts, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};
