import React, { useEffect, useState } from "react";
import axios from "axios";

const ModerateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://product-hunt-server-eight.vercel.app/productsModerator/pending"
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

  // Handle product moderation (Approve/Reject)
  const handleModeration = async (productId, action) => {
    try {
      // Ensure the action sent to the backend is either "approved" or "rejected"
      const status = action === "approve" ? "approved" : "rejected";

      const response = await axios.patch(
        `https://product-hunt-server-eight.vercel.app/products/${productId}`,
        { status }
      );

      if (response.status === 200) {
        // Remove moderated product from the list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        throw new Error("Failed to update product status.");
      }
    } catch (err) {
      console.error("Error moderating product:", err);
      setError("Failed to update product status.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Moderate Products</h1>
      {products.length === 0 ? (
        <p>No products to moderate.</p>
      ) : (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Submitted By</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2 text-left">
                  {product.name || "N/A"}
                </td>
                <td className="border px-4 py-2 text-left">
                  {product.userName || product.userEmail || "N/A"}
                </td>
                <td className="border px-4 py-2 text-left">
                  <button
                    onClick={() => handleModeration(product._id, "approve")}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleModeration(product._id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModerateProducts;
