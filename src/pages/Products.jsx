import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]); // Store approved products
  const [searchQuery, setSearchQuery] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalProducts, setTotalProducts] = useState(0); // Total products count
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Show loader while fetching
      try {
        const response = await axios.get(
          `https://product-hunt-server-eight.vercel.app/approvedProducts?page=${currentPage}&search=${searchQuery}`
        );
        const { products = [], total = 0 } = response.data; // Default fallback
        setProducts(products); // Update products list
        setTotalProducts(total); // Update total count
      } catch (error) {
        console.error("Error fetching approved products:", error);
        setProducts([]); // Reset products on error
      } finally {
        setLoading(false); // Hide loader after fetch
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery]);

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Loader Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        )}

        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={12}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
