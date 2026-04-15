import { axiosInstance } from "../axios/axiosInstance";

// Login user
export const login = async (formData) => {
  try {
    const res = await axiosInstance.post("/users/login", formData);
    console.log("✅ Login success:", res.data);
    
    // Store token in localStorage
    if (res.data.access) {
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
    }
    
    return res.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Register user
export const register = async (formData) => {
  try {
    const res = await axiosInstance.post("/users/register", formData);
    console.log("✅ Register success:", res.data);
    
    // Store token in localStorage
    if (res.data.access) {
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
    }
    
    return res.data;
  } catch (error) {
    console.error("❌ Register error:", error.response?.data || error.message);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    console.log("✅ Get current user success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get current user error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};


