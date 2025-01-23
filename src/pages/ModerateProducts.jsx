import React, { useEffect, useState } from "react";
import axios from "axios";

const ModerateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products?status=pending"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleModeration = async (productId, action) => {
    try {
      await axios.put(`http://localhost:5000/products/${productId}`, {
        status: action,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error moderating product:", error);
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
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Submitted By</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.submittedBy}</td>
                <td className="border px-4 py-2">
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
