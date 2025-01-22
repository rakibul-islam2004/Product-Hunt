import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://localhost:5000/getRole/${user.email}`
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Dashboard</h2>
        </div>
        <ul className="flex-1 px-4 space-y-2">
          {role === "admin" && (
            <>
              <li>
                <Link
                  to="/admin/users"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/statistics"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/coupons"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Manage Coupons
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Manage Products
                </Link>
              </li>
            </>
          )}
          {role === "moderator" && (
            <>
              <li>
                <Link
                  to="/moderator/products"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Review Products
                </Link>
              </li>
              <li>
                <Link
                  to="/moderator/reports"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Reported Products
                </Link>
              </li>
              <li>
                <Link
                  to="/moderator/featured"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Mark Featured
                </Link>
              </li>
            </>
          )}
          {role === "user" && (
            <>
              <li>
                <Link
                  to="/user/products"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  My Products
                </Link>
              </li>
              <li>
                <Link
                  to="/user/favorites"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Favorite Products
                </Link>
              </li>
              <li>
                <Link
                  to="/user/reports"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Report a Product
                </Link>
              </li>
              <li>
                <Link
                  to="/user/reviews"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  My Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/user/submit"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Submit New Product
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              My Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/help"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Help & Support
            </Link>
          </li>
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
              Back to Home
            </Link>
          </li>
        </ul>
        <div className="p-4 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2025 Product Hunt</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-200">
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
