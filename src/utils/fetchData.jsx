import axios from "axios";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Error fetching data");
  }
};

export default fetchData;
