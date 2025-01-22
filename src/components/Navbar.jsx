import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ConfirmationModal Component
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-gray-800 text-lg">{message}</p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, logout, role, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully logged out!", {
          position: "top-right", // Toast position
          autoClose: 3000, // Auto-close after 3 seconds
          onClose: () => navigate("/login"), // Navigate after closing the toast
        });
      })
      .catch(() => {
        toast.error("Error logging out! Please try again.");
      });
    setIsModalOpen(false); // Close modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} />
      </div>
    );
  }

  return (
    <>
      <nav className="bg-blue-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Product Hunt
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-gray-300 underline" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-gray-300 underline" : "hover:text-gray-300"
              }
            >
              Products
            </NavLink>
            {user && role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 underline" : "hover:text-gray-300"
                }
              >
                Admin Panel
              </NavLink>
            )}
            {user && role === "moderator" && (
              <NavLink
                to="/moderation"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 underline" : "hover:text-gray-300"
                }
              >
                Moderation
              </NavLink>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                />
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg">
                    <div className="p-4">
                      <p className="font-bold">{user.displayName}</p>
                    </div>
                    <hr />
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => setIsModalOpen(true)} // Open modal
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-gray-300 underline" : "hover:text-gray-300"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-gray-300 underline" : "hover:text-gray-300"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block text-gray-300 underline"
                  : "block hover:text-gray-300"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "block text-gray-300 underline"
                  : "block hover:text-gray-300"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            {user && role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "block text-gray-300 underline"
                    : "block hover:text-gray-300"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}
            {user && role === "moderator" && (
              <NavLink
                to="/moderation"
                className={({ isActive }) =>
                  isActive
                    ? "block text-gray-300 underline"
                    : "block hover:text-gray-300"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Moderation
              </NavLink>
            )}
          </div>
        )}
        <ToastContainer />
      </nav>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)} // Close modal
      />
    </>
  );
};

export default Navbar;
