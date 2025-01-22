import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for show/hide password

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password, name, photoURL);

      // Add default role as "user" after registration
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role: "user", name, photoURL, password }), // Assign "user" role by default
      });

      if (!response.ok) {
        throw new Error("Failed to set user role.");
      }

      toast.success("Registration successful!"); // Show success toast
      setTimeout(() => navigate("/"), 2000); // Delay navigation
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              required
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
