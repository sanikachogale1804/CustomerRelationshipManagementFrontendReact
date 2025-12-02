import React, { useEffect, useState } from "react";
import axios from "axios";
import '../CSS/ChangePassword.css';
import { fetchUsers } from "../services/userService";

export default function ChangePassword() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load all users for admin to select
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      setError("Please select a user.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Admin JWT
      await axios.put(
        `http://localhost:8080/admin/users/${selectedUser}/reset-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Password reset successfully!");
      setError("");
      setNewPassword("");
      setConfirmPassword("");
      setSelectedUser("");
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err.response?.data || "Something went wrong. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="change-password-container">
      <h3>Admin: Reset User Password</h3>

      <form onSubmit={handleChangePassword} className="change-password-form">
        <div>
          <label>Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">-- Select a user --</option>
            {users.map((user) => {
              const userId = user._links.self.href.split("/").pop();
              return (
                <option key={userId} value={userId}>
                  {user.fullName} ({user.username})
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Reset Password</button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
