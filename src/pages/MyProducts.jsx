import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/DashboardLayout";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    // Fetch user's products from the API
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/my-products"
        );
        setMyProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setMyProducts(myProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">My Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-0 right-0 bg-gray-800 text-white p-2 rounded">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyProducts;
