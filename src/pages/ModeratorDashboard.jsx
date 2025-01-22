import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/DashboardLayout";
import axios from "axios";

const ModeratorDashboard = () => {
  const [productsForReview, setProductsForReview] = useState([]);
  const [reportedProducts, setReportedProducts] = useState([]);

  useEffect(() => {
    // Fetch products that need to be reviewed
    const fetchReviewProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/review"
        );
        setProductsForReview(response.data);
      } catch (error) {
        console.error("Error fetching products for review:", error);
      }
    };

    // Fetch reported products
    const fetchReportedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/reported"
        );
        setReportedProducts(response.data);
      } catch (error) {
        console.error("Error fetching reported products:", error);
      }
    };

    fetchReviewProducts();
    fetchReportedProducts();
  }, []);

  const handleProductApproval = async (id) => {
    try {
      await axios.put(`http://localhost:5000/products/${id}/approve`);
      setProductsForReview(
        productsForReview.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const handleProductRejection = async (id) => {
    try {
      await axios.put(`http://localhost:5000/products/${id}/reject`);
      setProductsForReview(
        productsForReview.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">Moderator Dashboard</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Products for Review</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productsForReview.map((product) => (
              <div key={product.id} className="p-4 border rounded">
                <p className="text-lg">{product.name}</p>
                <p className="text-sm">{product.description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleProductApproval(product.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProductRejection(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Reported Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reportedProducts.map((product) => (
              <div key={product.id} className="p-4 border rounded">
                <p className="text-lg">{product.name}</p>
                <p className="text-sm">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ModeratorDashboard;
