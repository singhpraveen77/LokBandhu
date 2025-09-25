import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ⚡ change for production
  // baseURL: "https://lokbandhu.onrender.com/api", // ⚡ change for production
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials:true
});
