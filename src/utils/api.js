import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

// Get all users
const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Update user role
const updateUserRole = async (userId, newRole) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${userId}/role`, {
      role: newRole,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user role"
    );
  }
};

// Get all products
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

// Moderate product (approve/reject)
const moderateProduct = async (productId, action) => {
  try {
    const response = await axios.put(
      `${API_URL}/products/${productId}/moderate`,
      {
        action,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to moderate product"
    );
  }
};

export { getUsers, updateUserRole, getProducts, moderateProduct };
