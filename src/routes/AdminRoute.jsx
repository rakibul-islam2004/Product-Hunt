import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import axios from "axios"; // Ensure axios is imported

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (user && user.email) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return user && role === "admin" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
