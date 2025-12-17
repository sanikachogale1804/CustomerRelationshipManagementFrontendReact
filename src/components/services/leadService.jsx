import axios from "axios";

export const BASE_URL = "http://localhost:8080/leads";

export const getLeads = () => {
  const token = localStorage.getItem("token");

  return axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ ADD THIS FUNCTION
export const getUserByLink = (url) => {
  const token = localStorage.getItem("token");

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
