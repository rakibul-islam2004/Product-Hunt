import React, { useState } from "react";
import MainLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("link", productLink);
    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        navigate("/my-products"); // Use navigate for redirection
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
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
            <label className="block text-lg">Product Image</label>
            <input
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
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
    </MainLayout>
  );
};

export default AddProduct;
