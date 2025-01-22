import axios from "axios";

const getRole = async () => {
  try {
    const response = await axios.get("http://localhost:5000/getRole");
    return response.data.role;
  } catch (error) {
    throw new Error("Failed to fetch role: " + error.message);
  }
};

export { getRole };
