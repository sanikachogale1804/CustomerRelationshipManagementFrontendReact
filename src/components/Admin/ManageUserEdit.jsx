import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers, updateUser } from "../services/userService";
import "../CSS/ManageUsersEdit.css"

function ManageUserEdit() {
  const { id } = useParams(); // user id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    mobileNo: "",
    designation: "",
    reportingTo: "",
    photoPath: "",
    aadharCardPath: "",
    certificatePath: "",
    panCardPath: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data by id
  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        const user = users.find(u => u._links.self.href.split("/").pop() === id);
        if (user) {
          setFormData({
            fullName: user.fullName || "",
            username: user.username || "",
            mobileNo: user.mobileNo || "",
            designation: user.designation || "",
            reportingTo: user.reportingTo ? user.reportingTo.href.split("/").pop() : "",
            photoPath: user.photoPath || "",
            aadharCardPath: user.aadharCardPath || "",
            certificatePath: user.certificatePath || "",
            panCardPath: user.panCardPath || ""
          });
        } else {
          alert("User not found");
          // navigate("/manage-users");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching user data");
        navigate("/manage-users");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const payload = { ...formData };

    // Convert reportingTo
    if (!payload.reportingTo || payload.reportingTo === "") {
      payload.reportingTo = null;
    } else {
      payload.reportingTo = { id: payload.reportingTo };
    }

    // For image paths: convert empty strings to null
    if (!payload.photoPath) payload.photoPath = null;
    if (!payload.aadharCardPath) payload.aadharCardPath = null;
    if (!payload.certificatePath) payload.certificatePath = null;
    if (!payload.panCardPath) payload.panCardPath = null;

    try {
      await updateUser(id, payload);
      alert("User updated successfully!");
      // navigate("/manage-users");
    } catch (err) {
      console.error(err);
      alert("Failed to update user. Check console.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="authPageBackground">
      <div className="loginWrapper">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit User</h2>

        <div className="loginCard">
          <label>Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} />

          <label>Username</label>
          <input name="username" value={formData.username} onChange={handleChange} />

          <label>Mobile Number</label>
          <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} />

          <label>Designation</label>
          <input name="designation" value={formData.designation} onChange={handleChange} />

          <label>Reporting To (User ID)</label>
          <input name="reportingTo" value={formData.reportingTo} onChange={handleChange} />

          {/* Optional: show image paths if needed */}
          <label>Photo Path</label>
          <input name="photoPath" value={formData.photoPath || ""} onChange={handleChange} />

          <label>Aadhar Card Path</label>
          <input name="aadharCardPath" value={formData.aadharCardPath || ""} onChange={handleChange} />

          <label>Certificate Path</label>
          <input name="certificatePath" value={formData.certificatePath || ""} onChange={handleChange} />

          <label>PAN Card Path</label>
          <input name="panCardPath" value={formData.panCardPath || ""} onChange={handleChange} />

          <button className="loginBtn" onClick={handleUpdate}>Update User</button>
          <button className="loginBtn" style={{ marginTop: "10px" }} onClick={() => navigate("settings/manage-users")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ManageUserEdit;
