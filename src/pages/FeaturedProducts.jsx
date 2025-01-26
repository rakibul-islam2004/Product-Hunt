import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch approved products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/approvedProductsModerator"
        );

        console.log("Response from server:", response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Unexpected response format. Expected an array.");
        }
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFeatured = async (productId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;

      // Update the product feature status on the server
      await axios.patch(
        `https://product-hunt-server-eight.vercel.app/featuredProductsModerator/${productId}`,
        {
          isFeatured: updatedStatus,
        }
      );

      // Update the state locally after success
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: updatedStatus }
            : product
        )
      );
    } catch (err) {
      setError("Failed to update the featured status.");
      console.error("Error updating featured status:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Product Name</th>
            <th className="px-4 py-2 border border-gray-300">Votes</th>
            <th className="px-4 py-2 border border-gray-300">Is Featured</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border border-gray-300">
                {product.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {product.upvotes?.length || 0}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {product.isFeatured ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    toggleFeatured(product._id, product.isFeatured)
                  }
                >
                  {product.isFeatured
                    ? "Remove from Featured"
                    : "Add to Featured"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedProducts;
