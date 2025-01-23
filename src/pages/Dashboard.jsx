import React from "react";
import MainLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Dashboard;
