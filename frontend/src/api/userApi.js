import { axiosInstance } from "../axios/axiosInstance"

export const login = async (formData) => {
  try {
    const res = await axiosInstance.post("/users/login", formData);
    console.log("✅ Login success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error;
  }
};


