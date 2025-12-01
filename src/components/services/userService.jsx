import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/users", {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        console.error("Server returned error:", res.status);
        return [];
    }

    const data = await res.json();

    // HATEOAS format
    if (data._embedded && data._embedded.users) {
        return data._embedded.users;
    }

    // If user returns list directly
    if (Array.isArray(data)) {
        return data;
    }

    return [];
};


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


export const updateUser = async (id, userData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please login.");

    const response = await axios.put(
        `http://localhost:8080/users/${id}`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};
