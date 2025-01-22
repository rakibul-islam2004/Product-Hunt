import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]); // Ensure `products` starts as an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/products?page=${currentPage}&search=${searchQuery}`
        );
        const { products = [], total = 0 } = response.data; // Ensure defaults if API data is missing
        setProducts(products); // Set products or an empty array
        setTotalProducts(total); // Set total or default to 0
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Ensure products is always an array on error
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalProducts}
          itemsPerPage={12}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
};

export default Products;
