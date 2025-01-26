import React from "react";
import { Routes, Route } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
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
        <Oval color="#00BFFF" height={80} width={80} />
        {/* Displaying loader spinner */}
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <Helmet>
              <title>Home | Product Hunt</title>
            </Helmet>
            <Home />
          </>
        }
      />
      <Route
        path="/products"
        element={
          <>
            <Helmet>
              <title>Products | Product Hunt</title>
            </Helmet>
            <Products />
          </>
        }
      />
      <Route
        path="/products/:id"
        element={
          <>
            <Helmet>
              <title>Product Details | Product Hunt</title>
            </Helmet>
            <ProductDetails />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Helmet>
              <title>Login | Product Hunt</title>
            </Helmet>
            <Login />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Helmet>
              <title>Register | Product Hunt</title>
            </Helmet>
            <Register />
          </>
        }
      />

      {/* Private Routes (Authenticated Users Only) */}
      <Route
        path="/update-product/:id"
        element={
          <PrivateRoute>
            <>
              <Helmet>
                <title>Update Product | Product Hunt</title>
              </Helmet>
              <UpdateProduct />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <>
              <Helmet>
                <title>Dashboard | Product Hunt</title>
              </Helmet>
              <Dashboard />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>My Profile | Product Hunt</title>
                </Helmet>
                <MyProfile />
              </>
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>Add Product | Product Hunt</title>
                </Helmet>
                <AddProduct />
              </>
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/my-products"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>My Products | Product Hunt</title>
                </Helmet>
                <MyProducts />
              </>
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
              <>
                <Helmet>
                  <title>Admin Dashboard | Product Hunt</title>
                </Helmet>
                <AdminDashboard />
              </>
            </DashboardLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>User Management | Product Hunt</title>
                </Helmet>
                <AdminUserManagement />
              </>
            </DashboardLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/statistics"
        element={
          <AdminRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>Admin Statistics | Product Hunt</title>
                </Helmet>
                <AdminStatistics />
              </>
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
              <>
                <Helmet>
                  <title>Moderator Dashboard | Product Hunt</title>
                </Helmet>
                <ModeratorDashboard />
              </>
            </DashboardLayout>
          </ModeratorRoute>
        }
      />
      <Route
        path="/moderator/products"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>Moderate Products | Product Hunt</title>
                </Helmet>
                <ModerateProducts />
              </>
            </DashboardLayout>
          </ModeratorRoute>
        }
      />
      <Route
        path="/featured"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>Featured Products | Product Hunt</title>
                </Helmet>
                <FeaturedProducts />
              </>
            </DashboardLayout>
          </ModeratorRoute>
        }
      />
      <Route
        path="/reported"
        element={
          <ModeratorRoute>
            <DashboardLayout>
              <>
                <Helmet>
                  <title>Reported Products | Product Hunt</title>
                </Helmet>
                <ReportedProducts />
              </>
            </DashboardLayout>
          </ModeratorRoute>
        }
      />

      {/* Catch-all for undefined routes */}
      <Route
        path="*"
        element={
          <MainLayout>
            <>
              <Helmet>
                <title>404 - Page Not Found | Product Hunt</title>
              </Helmet>
              <ErrorPage />
            </>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
