import React from "react";
import { Routes, Route } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import useAuth from "./hooks/useAuth";
import AdminUserManagement from "./pages/AdminUserManagement";
import ModerateProducts from "./pages/ModerateProducts";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ModeratorRoute from "./routes/ModeratorRoute";
import UpdateProduct from "./pages/UpdateProduct";
import FeaturedProducts from "./pages/FeaturedProducts";
import AdminStatistics from "./pages/AdminStatistics";
import ReportedProducts from "./pages/ReportedProducts";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval color="#00BFFF" height={80} width={80} />{" "}
        {/* Displaying loader spinner */}
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes (Authenticated Users Only) */}
      <Route
        path="/update-product/:id"
        element={
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MyProfile />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <AddProduct />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/my-products"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MyProducts />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <DashboardLayout>
              <AdminUserManagement />
            </DashboardLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/statistics"
        element={
          <AdminRoute>
            <DashboardLayout>
              <AdminStatistics />
            </DashboardLayout>
          </AdminRoute>
        }
      />

      {/* Moderator Routes */}
      <Route
        path="/moderator-dashboard"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <ModeratorDashboard />
            </DashboardLayout>
          </ModeratorRoute>
        }
      />
      <Route
        path="/moderator/products"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <ModerateProducts />
            </DashboardLayout>
          </ModeratorRoute>
        }
      />
      <Route
        path="/featured"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <FeaturedProducts />
            </DashboardLayout>
          </ModeratorRoute>
        }
      />

      <Route
        path="/reported"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <ReportedProducts />
            </DashboardLayout>
          </ModeratorRoute>
        }
      />

      {/* Catch-all for undefined routes */}
      <Route
        path="*"
        element={
          <MainLayout>
            <ErrorPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
