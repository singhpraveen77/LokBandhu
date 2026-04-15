import { axiosInstance } from "../axios/axiosInstance";

// Get assigned issues for current admin
export const getAssignedIssues = async () => {
  try {
    const res = await axiosInstance.get("/admin/issues/");
    console.log("✅ Get assigned issues success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get assigned issues error:", error.response?.data || error.message);
    throw error;
  }
};

// Get admin dashboard stats
export const getAdminDashboard = async () => {
  try {
    const res = await axiosInstance.get("/admin/dashboard/");
    console.log("✅ Get dashboard success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get dashboard error:", error.response?.data || error.message);
    throw error;
  }
};
