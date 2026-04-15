import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ⚡ Backend URL
  // baseURL: "https://lokbandhu.onrender.com/api", // ⚡ change for production
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
