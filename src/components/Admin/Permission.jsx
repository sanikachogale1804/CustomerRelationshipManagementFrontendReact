import React, { useEffect, useState } from "react";
import {
  getAllPermissions,
  addPermission,
  updatePermission,
  deletePermission
} from "../services/userService";

function Permission() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ permissionName: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch permissions
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const data = await getAllPermissions();
      setPermissions(data);
    } catch (error) {
      alert("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.permissionName.trim()) {
      alert("Permission name is required");
      return;
    }

    try {
      if (editingId) {
        const updatedPermission = await updatePermission(editingId, formData);
        alert("Permission updated successfully!");
        setPermissions((prev) =>
          prev.map((perm) =>
            perm.id === editingId ? updatedPermission : perm
          )
        );
      } else {
        const newPerm = await addPermission(formData);
        alert("Permission added successfully!");
        setPermissions((prev) => [...prev, newPerm]);
      }

      setFormData({ permissionName: "", description: "" });
      setEditingId(null);
    } catch (error) {
      alert("Operation failed. See console for details.");
      console.error(error);
    }
  };

  const handleEdit = (perm) => {
    setEditingId(perm.id);
    setFormData({ permissionName: perm.permissionName, description: perm.description });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        await deletePermission(id);
        setPermissions((prev) => prev.filter((p) => p.id !== id));
        alert("Permission deleted successfully!");
      } catch (error) {
        alert("Failed to delete permission");
        console.error(error);
      }
    }
  };

  if (loading) return <p>Loading permissions...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Permissions</h2>

      {/* Add/Edit form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="permissionName"
          placeholder="Permission Name"
          value={formData.permissionName}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ permissionName: "", description: "" });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Permissions table */}
      {permissions.length === 0 ? (
        <p>No permissions found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Permission Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id}>
                <td>{perm.id}</td>
                <td>{perm.permissionName}</td>
                <td>{perm.description}</td>
                <td>
                  <button onClick={() => handleEdit(perm)}>Edit</button>
                  <button onClick={() => handleDelete(perm.id)} style={{ marginLeft: "10px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Permission;
