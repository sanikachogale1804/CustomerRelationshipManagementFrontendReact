import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:8080";

// ---------------- Users ----------------

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    const data = response.data;

    // Handle HATEOAS format
    if (data._embedded && data._embedded.users) {
      return data._embedded.users;
    }

    // If API returns array directly
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Extract parent ID from reportingTo
export const getParentsId = (user) => {
  if (!user.reportingTo) return null;
  const parts = user.reportingTo.href.split("/");
  return parseInt(parts[parts.length - 1]);
};

// Register user
export const registerUser = async (formDataObj) => {
  try {
    const formData = new FormData();
    for (const key in formDataObj) {
      if (formDataObj[key] !== null && formDataObj[key] !== "") {
        formData.append(key, formDataObj[key]);
      }
    }

    const response = await axios.post(`${API_BASE_URL}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error.response || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response || error.message);
    throw error;
  }
};

// Update user
export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response || error.message);
    throw error;
  }
};

// Change password
export const updatePassword = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/users/change-password`, data, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error.response || error.message);
    throw error;
  }
};

// ---------------- Permissions ----------------

// Get all permissions
export const getAllPermissions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/permissions`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    // Handle HAL format or plain array
    return response.data._embedded
      ? response.data._embedded.permissions
      : response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error.response || error.message);
    throw error;
  }
};

// Add permission
export const addPermission = async (permission) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/permissions`, permission, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding permission:", error.response || error.message);
    throw error;
  }
};

// Update permission
export const updatePermission = async (id, permission) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/permissions/${id}`, permission, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating permission:", error.response || error.message);
    throw error;
  }
};

// Delete permission
export const deletePermission = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/permissions/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting permission:", error.response || error.message);
    throw error;
  }
};
