import axios from "axios";

const getAllProduct = async ({ search = "", category = "", minPrice = "", maxPrice = "", page = 1 }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
        params: { search, category, minPrice, maxPrice, page }
      });
  
      return response.data;
    } catch (error: any) {
      throw error.response || "Failed to fetch data.";
    }
  };

const getProduct = async (id: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response || "Failed to fetch data.";
    }
}

export { getAllProduct, getProduct };