import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImageURL, setProductImageURL] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  // Fetch the current product data based on the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        const data = response.data;
        const product = data.product;

        // Log the product data for debugging
        console.log("Fetched product data:", product);

        // Set the product data to the state only after it's fetched
        setProductName(product.name || "");
        setProductDescription(product.description || "");
        setProductLink(product.link || "");
        setProductImageURL(product.image || ""); // Ensure it's set to a valid URL or empty

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to fetch product data.");
        console.error("Error fetching product:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Depend on 'id' so it fetches the data again if the id changes

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
      formData.append("image", productImageURL);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
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

  if (loading) {
    return <p>Loading...</p>;
  }

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
          <label className="block text-lg">Product Image URL</label>
          <input
            type="url"
            value={productImageURL}
            onChange={(e) => setProductImageURL(e.target.value)}
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
