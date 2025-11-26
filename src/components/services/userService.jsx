import axios from "axios";

export const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/users");
    const data = await res.json();
    return data._embedded ? data._embedded.users : [];
}

export const getParentsId = (user) => {
    if (!user.reportingTo) return null;
    const parts = user.reportingTo.href.split("/");
    return parseInt(parts[parts.length - 1]);
}

export const registerUser = async (data) => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",   // IMPORTANT
    body: JSON.stringify(data)
  });
  return response.json();
};


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/login",
            credentials,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true   // ⭐ ADD THIS
            }
        );

        return response.data;
    } catch (error) {
        console.error("Login Failed:", error);
        throw error;
    }
};
