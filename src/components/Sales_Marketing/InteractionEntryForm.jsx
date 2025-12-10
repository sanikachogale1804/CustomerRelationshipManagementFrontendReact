import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";
import axios from "axios";
import "../CSS/InteractionEntryForm.css";

function InteractionEntryForm({ lead, onClose }) {
    const initialState = {
        date: "",
        time: "",
        tagLocation: "",
        type: "",
        note: "",
        description: "",
        appointmentDate: "",
        appointmentTime: "",
        assignedTo: "", // will be a string from dropdown
        appointmentType: "",
        lead: lead ? { id: lead.id } : null, // ✅ add lead here
    };


    const [interaction, setInteraction] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    // Load users for "Assigned To" dropdown
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
                    return {
                        id,
                        fullName: u.fullName || u.username || "Unnamed User",
                    };
                });

                setUsers(userList);
            } catch (err) {
                console.error("Failed to load users:", err);
                setUsers([]);
            }
        };

        loadUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInteraction((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!interaction.date) newErrors.date = "Date is required";
        if (!interaction.description.trim())
            newErrors.description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Get lead ID from object or _links
    const getLeadId = () => {
        if (lead?.id) return lead.id;
        if (lead?._links?.self?.href) {
            const parts = lead._links.self.href.split("/");
            return parseInt(parts[parts.length - 1], 10);
        }
        return null;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const assignedId = parseInt(interaction.assignedTo, 10);
        const payload = {
            ...interaction,
            lead: { id: lead.id },  // ensure lead.id always exists
            assignedTo: !isNaN(assignedId) ? { id: assignedId } : null,
        };

        // Remove empty fields
        Object.keys(payload).forEach((key) => {
            if (payload[key] === "" || payload[key] === null) delete payload[key];
        });

        console.log("FINAL PAYLOAD:", payload);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/interactions",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Backend response:", response);

            // Only show success if backend returns status 201 or response.data.id
            if (response.status === 201 || response.data?.id) {
                alert("Interaction saved successfully!");
                onClose();
            } else {
                alert(
                    "Interaction not saved. Check backend logs. Response: " +
                    JSON.stringify(response.data)
                );
            }
        } catch (err) {
            console.error("Error saving interaction:", err.response || err);
            alert(
                "Error saving interaction. Check console for details. " +
                (err.response?.data ? JSON.stringify(err.response.data) : "")
            );
        }
    };

    return (
        <div className="interaction-modal-overlay">
            <div className="interaction-modal">
                <h2 className="modal-heading">Interaction Entry</h2>

                <div className="section-block">
                    <label>Description *</label>
                    <textarea
                        name="description"
                        value={interaction.description}
                        onChange={handleChange}
                        placeholder="Enter interaction description"
                    />
                    {errors.description && (
                        <span className="error">{errors.description}</span>
                    )}

                    <label>Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={interaction.date}
                        onChange={handleChange}
                    />
                    {errors.date && <span className="error">{errors.date}</span>}

                    <label>Time</label>
                    <input
                        type="time"
                        name="time"
                        value={interaction.time}
                        onChange={handleChange}
                    />

                    <label>Tag Location</label>
                    <input
                        type="text"
                        name="tagLocation"
                        value={interaction.tagLocation}
                        onChange={handleChange}
                    />

                    <label>Interaction Type</label>
                    <select name="type" value={interaction.type} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Call</option>
                        <option>Meeting</option>
                        <option>Online</option>
                        <option>Email</option>
                        <option>Message</option>
                        <option>Other</option>
                    </select>

                    <label>Notes</label>
                    <textarea name="note" value={interaction.note} onChange={handleChange} />
                </div>

                <hr />

                <h2 className="modal-heading">Next Appointment</h2>
                <div className="section-block">
                    <label>Date</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={interaction.appointmentDate}
                        onChange={handleChange}
                    />

                    <label>Time</label>
                    <input
                        type="time"
                        name="appointmentTime"
                        value={interaction.appointmentTime}
                        onChange={handleChange}
                    />

                    <label>Assigned To</label>
                    <select
                        name="assignedTo"
                        value={interaction.assignedTo}
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={String(user.id)}>
                                {user.fullName}
                            </option>
                        ))}
                    </select>

                    <label>Appointment Type</label>
                    <select
                        name="appointmentType"
                        value={interaction.appointmentType}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option>Call</option>
                        <option>Meeting</option>
                        <option>Online</option>
                        <option>Email</option>
                        <option>Message</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="btn-row">
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InteractionEntryForm;
