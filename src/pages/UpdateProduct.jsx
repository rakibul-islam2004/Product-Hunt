import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL params
  const { user } = useAuth(); // Assuming useAuth provides the authenticated user

  // Fetch the current product data based on the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        const product = response.data;

        setProductName(product.name);
        setProductDescription(product.description);
        setProductLink(product.link);
        // You may want to set a preview image or handle image differently
      } catch (error) {
        setError("Failed to fetch product data.");
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
    formData.append("userName", user.name); // Add user name to the form data
    formData.append("userEmail", user.email); // Add user email to the form data
    if (productImage) {
      formData.append("image", productImage); // Add image if available
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/my-products");
      }
    } catch (error) {
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", error.response || error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Update Product</h2>
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
          <label className="block text-lg">Product Image</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="w-full p-4 border rounded"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
