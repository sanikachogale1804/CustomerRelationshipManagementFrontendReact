import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "../services/userService";
import "../CSS/ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editUser, setEditUser] = useState(null); // selected user for editing
  const [formData, setFormData] = useState({});   // form values

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

  // Call backend to update user
  const handleUpdate = async () => {
    try {
      if (!editUser.id) {
        alert("User ID is missing!");
        return;
      }

      await updateUser(editUser.id, formData);
      alert("User updated successfully!");
      setEditUser(null);
      loadUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Check console for details.");
    }
  };

  return (
    <div className="manage-container">
      <h2 className="manage-title">Manage Users</h2>

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : (
        <table className="user-table">
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
                      <button className="edit-btn" onClick={() => handleEdit(user)}>
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

      {/* EDIT USER MODAL */}
      {editUser && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit User</h3>

            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
            />

            <label>Username</label>
            <input
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
            />

            <label>Mobile</label>
            <input
              name="mobileNo"
              value={formData.mobileNo || ""}
              onChange={handleChange}
            />

            <label>Designation</label>
            <input
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
            />

            <div className="btn-row">
              <button className="save-btn" onClick={handleUpdate}>Update</button>
              <button className="cancel-btn" onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageUsers;
