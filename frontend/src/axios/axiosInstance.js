import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ⚡ Backend URL
  // baseURL: "https://lokbandhu.onrender.com/api", // ⚡ change for production
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false
});
