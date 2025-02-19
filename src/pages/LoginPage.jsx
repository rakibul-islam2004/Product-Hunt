import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AutoFillButtons = ({ onAutoFill }) => {
  const demoUsers = [
    { role: "Admin", email: "mdrakib@gmail.com", password: "R1111b" },
    { role: "Moderator", email: "mdrakib1@gmail.com", password: "R1111b" },
    { role: "User 1", email: "mdrakib2@gmail.com", password: "R1111b" },
    { role: "User 2", email: "mdrakib3@gmail.com", password: "R1111b" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-64">
      <h3 className="text-lg font-bold mb-3">Demo Logins</h3>
      {demoUsers.map((user) => (
        <button
          key={user.email}
          className="w-full bg-gray-200 p-2 rounded mb-2"
          onClick={() => onAutoFill(user.email, user.password)}
        >
          {user.role} Login
        </button>
      ))}
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { token } = await loginWithEmail(email, password);
      const roleResponse = await fetch(
        `https://product-hunt-server-eight.vercel.app/getRole/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const roleData = await roleResponse.json();
      if (roleData.role === "admin" || roleData.role === "moderator") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(`${err}`);
    }
  };

  const handleAutoFill = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen gap-4 sm:gap-8 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mb-4"
            >
              Login
            </button>
          </form>
          <Link to="/register" className="block text-center mt-4 text-blue-500">
            Don't have an account? Register
          </Link>
        </div>
        <AutoFillButtons onAutoFill={handleAutoFill} />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
