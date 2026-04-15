import { axiosInstance } from "../axios/axiosInstance";

// Get all issues with optional filters
export const getIssues = async (params = {}) => {
  try {
    const res = await axiosInstance.get("/issues/", { params });
    console.log("✅ Get issues success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get issues error:", error.response?.data || error.message);
    throw error;
  }
};

// Get single issue by ID
export const getIssue = async (id) => {
  try {
    const res = await axiosInstance.get(`/issues/${id}/`);
    console.log("✅ Get issue success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get issue error:", error.response?.data || error.message);
    throw error;
  }
};

// Create new issue
export const createIssue = async (formData) => {
  try {
    const res = await axiosInstance.post("/issues/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Create issue success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Create issue error:", error.response?.data || error.message);
    throw error;
  }
};

// Like/Unlike issue
export const likeIssue = async (id) => {
  try {
    const res = await axiosInstance.post(`/issues/${id}/like/`);
    console.log("✅ Like issue success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Like issue error:", error.response?.data || error.message);
    throw error;
  }
};

// Update issue status (admin only)
export const updateIssueStatus = async (id, status) => {
  try {
    const res = await axiosInstance.patch(`/issues/${id}/status/`, { status });
    console.log("✅ Update status success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Update status error:", error.response?.data || error.message);
    throw error;
  }
};

// Assign issue (admin only)
export const assignIssue = async (id, data) => {
  try {
    const res = await axiosInstance.patch(`/issues/${id}/assign/`, data);
    console.log("✅ Assign issue success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Assign issue error:", error.response?.data || error.message);
    throw error;
  }
};
