import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    acceptedProducts: 0,
    pendingProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [productsResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:5000/allProducts"),
          axios.get("http://localhost:5000/allUsers"),
        ]);

        const products = productsResponse.data;
        const users = usersResponse.data;

        // Calculate statistics
        const totalProducts = products.length;
        const acceptedProducts = products.filter(
          (product) => product.status === "approved"
        ).length;
        const pendingProducts = totalProducts - acceptedProducts;
        const totalReviews = products.reduce(
          (sum, product) => sum + product.reviews.length,
          0
        );
        const totalUsers = users.length;

        setStats({
          totalProducts,
          acceptedProducts,
          pendingProducts,
          totalReviews,
          totalUsers,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading statistics...</div>;
  }

  const data = {
    labels: [
      "Accepted Products",
      "Pending Products",
      "Total Reviews",
      "Total Users",
    ],
    datasets: [
      {
        data: [
          stats.acceptedProducts,
          stats.pendingProducts,
          stats.totalReviews,
          stats.totalUsers,
        ],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Statistics</h1>
      <div className="w-2/4 mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-4">
        <p>
          <strong>Total Products:</strong> {stats.totalProducts}
        </p>
        <p>
          <strong>Accepted Products:</strong> {stats.acceptedProducts}
        </p>
        <p>
          <strong>Pending Products:</strong> {stats.pendingProducts}
        </p>
        <p>
          <strong>Total Reviews:</strong> {stats.totalReviews}
        </p>
        <p>
          <strong>Total Users:</strong> {stats.totalUsers}
        </p>
      </div>
    </div>
  );
};

export default AdminStatistics;
