import React, { useEffect, useState } from "react";
import {
  getAllPermissions,
  addPermission,
  updatePermission,
  deletePermission
} from "../services/userService";
import "../CSS/Permission.css"; // import CSS

function Permission() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ permissionName: "", description: "" });
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => { fetchPermissions(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.permissionName.trim()) { alert("Permission name is required"); return; }
    try {
      if (editingId) {
        const updatedPermission = await updatePermission(editingId, formData);
        alert("Permission updated successfully!");
        setPermissions((prev) => prev.map((perm) => perm.id === editingId ? updatedPermission : perm));
      } else {
        const newPerm = await addPermission(formData);
        alert("Permission added successfully!");
        setPermissions((prev) => [...prev, newPerm]);
      }
      setFormData({ permissionName: "", description: "" });
      setEditingId(null);
    } catch (error) {
      alert("Operation failed. See console for details."); console.error(error);
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
        alert("Failed to delete permission"); console.error(error);
      }
    }
  };

  if (loading) return <p>Loading permissions...</p>;

  return (
    <div className="permission-container">
      <h2>Manage Permissions</h2>

      <form onSubmit={handleSubmit} className="permission-form">
        <input
          type="text"
          name="permissionName"
          placeholder="Permission Name"
          value={formData.permissionName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setFormData({ permissionName: "", description: "" }); }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      {permissions.length === 0 ? (
        <p>No permissions found.</p>
      ) : (
        <table className="permission-table">
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
                  <button className="edit-btn" onClick={() => handleEdit(perm)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(perm.id)}>Delete</button>
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
