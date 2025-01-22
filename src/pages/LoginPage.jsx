import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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

      const roleResponse = await fetch("http://localhost:5000/get-role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token
        },
      });
      const roleData = await roleResponse.json();

      if (roleData.role === "admin") navigate("/admin-dashboard");
      else if (roleData.role === "moderator") navigate("/moderator-dashboard");
      else navigate("/");
    } catch (err) {
      setError(`${err}`);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { token } = await loginWithGoogle();

      const roleResponse = await fetch("http://localhost:5000/get-role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const roleData = await roleResponse.json();

      if (roleData.role === "admin") navigate("/admin-dashboard");
      else if (roleData.role === "moderator") navigate("/moderator-dashboard");
      else navigate("/");
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
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
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Login with Google
          </button>
          <Link to="/register" className="block text-center mt-4 text-blue-500">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
