import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading, isRole } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return user && isRole("admin") ? children : <Navigate to="/login" />;
};

export default AdminRoute;
