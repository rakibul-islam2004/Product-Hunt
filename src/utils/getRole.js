import axios from "axios";

const getRole = async () => {
  try {
    const response = await axios.get(
      "https://product-hunt-server-eight.vercel.app/getRole"
    );
    return response.data.role;
  } catch (error) {
    throw new Error("Failed to fetch role: " + error.message);
  }
};

export { getRole };
