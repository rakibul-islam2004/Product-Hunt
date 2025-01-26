import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/DashboardLayout";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's products from the API
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get(
          `https://product-hunt-server-eight.vercel.app/products/${user.email}`
        );
        setMyProducts(response.data);
        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://product-hunt-server-eight.vercel.app/products/${id}`
      );
      setMyProducts(myProducts.filter((product) => product._id !== id)); // Ensure you use _id instead of id
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Products</h2>

      {loading ? ( // Show loader while data is being fetched
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full"
            role="status"
          ></div>
        </div>
      ) : myProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Product Name
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Votes
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{product.name}</td>
                  <td className="py-4 px-6 text-gray-800">
                    {product.upvotes.length || 0}
                  </td>
                  <td
                    className={`py-4 px-6 font-medium ${
                      product.status === "Accepted"
                        ? "text-green-600"
                        : product.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {product.status || "Pending"}
                  </td>
                  <td className="py-4 px-6 flex justify-center gap-4">
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          You have not posted any products yet.
        </p>
      )}
    </div>
  );
};

export default MyProducts;
