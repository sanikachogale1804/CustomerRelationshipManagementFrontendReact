import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import '../CSS/ManageUsers.css'

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = (id) => {
    alert("Edit user: " + id);
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
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName || "-"}</td>
                  <td>{user.username || "-"}</td>
                  <td>{user.mobileNo || "-"}</td>
                  <td>{user.designation || "-"}</td>
                  <td>
                    {user.reportingTo
                      ? user.reportingTo.href.split("/").pop()
                      : "None"}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user.id)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;
