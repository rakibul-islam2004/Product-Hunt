import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import AdminStatistics from "./AdminStatistics";
import ModerateProducts from "./ModerateProducts";

const Dashboard = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://product-hunt-server-eight.vercel.app/getRole/${user.email}`
      );
      setRole(response.data.role);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserRole();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" loading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <MainLayout>
      {role === "user" && (
        <div className="container mx-auto p-8">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="mt-6">
            <p className="mb-4">
              Welcome to your dashboard. Manage your profile and products here.
            </p>
            <Link to="/profile">
              <button className="py-2 px-4 bg-blue-500 text-white rounded">
                Manage Profile
              </button>
            </Link>
          </div>
        </div>
      )}
      {role === "moderator" && <ModerateProducts />}
      {role === "admin" && <AdminStatistics />}
    </MainLayout>
  );
};

export default Dashboard;
