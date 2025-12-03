import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "../services/userService";
import "../CSS/ManageUsers.css";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editUser, setEditUser] = useState(null); // selected user for editing
  const [formData, setFormData] = useState({});   // form values
  const navigate = useNavigate();

  // Load all users
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Open modal to edit user
  const handleEdit = (user) => {
    // Extract user id from _links.self.href
    const userId = user._links.self.href.split("/").pop();
    setEditUser({ ...user, id: userId });
    setFormData({ ...user });
  };

  // Update form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editUser?.id) return alert("User ID is missing!");

    const payload = { ...formData };

    // reportingTo
    if (!payload.reportingTo || payload.reportingTo === "") {
      payload.reportingTo = null;
    } else {
      payload.reportingTo = { id: payload.reportingTo };
    }

    // For image paths: if empty string, set to null
    if (!payload.photoPath) payload.photoPath = null;
    if (!payload.aadharCardPath) payload.aadharCardPath = null;
    if (!payload.certificatePath) payload.certificatePath = null;
    if (!payload.panCardPath) payload.panCardPath = null;

    try {
      await updateUser(editUser.id, payload);
      alert("User updated successfully!");
      setEditUser(null);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update user. Check console.");
    }
  };


 return (
  <div className="manage-container">
    <h2 className="manage-title">Manage Users</h2>

    {loading ? (
      <p className="loading-text">Loading users...</p>
    ) : (
      <table className="user-table" border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Reporting To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">No users found</td>
            </tr>
          ) : (
            users.map((user) => {
              const userId = user._links.self.href.split("/").pop();
              return (
                <tr key={userId}>
                  <td>{userId}</td>
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.designation}</td>
                  <td>{user.reportingTo ? user.reportingTo.href.split("/").pop() : "None"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/settings/manage-users-edit/${userId}`)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    )}
  </div>
);

}

export default ManageUsers;
