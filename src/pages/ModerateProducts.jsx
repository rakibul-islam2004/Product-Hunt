import React, { useEffect, useState } from "react";
import { getProducts, moderateProduct } from "../utils/api";

const ModerateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleModeration = async (productId, action) => {
    try {
      await moderateProduct(productId, action);
      setProducts(
        products.map((product) =>
          product._id === productId ? { ...product, status: action } : product
        )
      );
    } catch (error) {
      console.error("Error moderating product:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Moderate Products</h1>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Submitted By</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.submittedBy}</td>
              <td className="border px-4 py-2">{product.status}</td>
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
    </div>
  );
};

export default ModerateProducts;
