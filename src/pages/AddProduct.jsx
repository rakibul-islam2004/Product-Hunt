import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImageURL, setProductImageURL] = useState(""); // Changed from file to URL
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("link", productLink);
    formData.append("userName", user.displayName);
    formData.append("userEmail", user.email);
    if (productImageURL) {
      formData.append("image", productImageURL); // Send image URL
    }

    try {
      const response = await axios.post(
        "https://product-hunt-server-eight.vercel.app/products",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        navigate("/my-products");
      }
    } catch (error) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", error.response || error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleProductSubmit}>
        <div className="mb-4">
          <label className="block text-lg">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-4 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full p-4 border rounded"
            rows="5"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Product Link</label>
          <input
            type="url"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            className="w-full p-4 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Product Image URL</label>
          <input
            type="url"
            value={productImageURL} // Updated to accept image URL
            onChange={(e) => setProductImageURL(e.target.value)}
            className="w-full p-4 border rounded"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
