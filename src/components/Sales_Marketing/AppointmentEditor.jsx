import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";
import axios from "axios";
import "../CSS/InteractionEntryForm.css"; // reuse styles

function AppointmentEditor({ lead, onClose }) {
  const [users, setUsers] = useState([]);
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    assignedTo: "",
    type: "",
    sendWhatsApp: false,
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        const userArray = data._embedded?.users || data;
        const userList = userArray.map((u) => {
          let id = u.id || u._id;
          if (!id && u._links?.self?.href) {
            const parts = u._links.self.href.split("/");
            id = parseInt(parts[parts.length - 1], 10);
          }
          return { id, fullName: u.fullName || u.username || "Unnamed User" };
        });
        setUsers(userList);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!appointment.date || !appointment.time) {
      alert("Date and Time are required");
      return;
    }

    const assignedId = parseInt(appointment.assignedTo, 10);
    const payload = {
      lead: { id: lead.id },
      appointmentDate: appointment.date,
      appointmentTime: appointment.time,
      assignedTo: !isNaN(assignedId) ? { id: assignedId } : null,
      type: appointment.type,
      sendWhatsApp: appointment.sendWhatsApp,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/appointments",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.data?.id) {
        alert("Appointment saved successfully!");
        onClose();
      } else {
        alert("Error saving appointment: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving appointment. Check console for details.");
    }
  };

  return (
    <div className="interaction-modal-overlay">
      <div className="interaction-modal">
        <h2>Edit Appointment for <strong>{lead.Business}</strong></h2>

        <label>Date *</label>
        <input type="date" name="date" value={appointment.date} onChange={handleChange} />

        <label>Time *</label>
        <input type="time" name="time" value={appointment.time} onChange={handleChange} />

        <label>Assigned To</label>
        <select name="assignedTo" value={appointment.assignedTo} onChange={handleChange}>
          <option value="">Select</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
        </select>

        <label>Type</label>
        <select name="type" value={appointment.type} onChange={handleChange}>
          <option value="">Select</option>
          <option>Call</option>
          <option>Meeting</option>
          <option>Online</option>
          <option>Email</option>
          <option>Message</option>
          <option>Other</option>
        </select>

        <label>
          <input type="checkbox" name="sendWhatsApp" checked={appointment.sendWhatsApp} onChange={handleChange} /> Send WhatsApp
        </label>

        <div className="btn-row">
          <button className="close-btn" onClick={onClose}>Close</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentEditor;
