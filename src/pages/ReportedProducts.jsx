import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReportedProducts = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch reported products
  useEffect(() => {
    const fetchReportedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/reportedProducts"
        );
        setReportedProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reported products:", error);
        toast.error("Failed to fetch reported products.");
        setLoading(false);
      }
    };

    fetchReportedProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`);
          setReportedProducts((prev) =>
            prev.filter((product) => product._id !== productId)
          );
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete the product.");
        }
      }
    });
  };

  // Handle marking product as not reported
  const handleNoProblem = async (productId) => {
    Swal.fire({
      title: "Mark as okay?",
      text: "This will mark the product as resolved.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:5000/reportedProducts/${productId}`,
            {
              isReported: false,
            }
          );
          setReportedProducts((prev) =>
            prev.filter((product) => product._id !== productId)
          );
          Swal.fire(
            "Success!",
            "The product has been marked as okay.",
            "success"
          );
        } catch (error) {
          console.error("Error updating product:", error);
          toast.error("Failed to mark the product as okay.");
        }
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Reported Products</h1>
      {reportedProducts.length === 0 ? (
        <p>No reported products available.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleNoProblem(product._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    No Problem
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

export default ReportedProducts;
