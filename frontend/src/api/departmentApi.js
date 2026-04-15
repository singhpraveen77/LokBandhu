import { axiosInstance } from "../axios/axiosInstance";

// Get all departments
export const getDepartments = async () => {
  try {
    const res = await axiosInstance.get("/departments/");
    console.log("✅ Get departments success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get departments error:", error.response?.data || error.message);
    throw error;
  }
};

// Get authorities in a department
export const getDepartmentAuthorities = async (departmentId) => {
  try {
    const res = await axiosInstance.get(`/departments/${departmentId}/authorities/`);
    console.log("✅ Get authorities success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get authorities error:", error.response?.data || error.message);
    throw error;
  }
};
