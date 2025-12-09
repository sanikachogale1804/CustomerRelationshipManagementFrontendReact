import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";
import axios from "axios";
import "../CSS/InteractionEntryForm.css";

function InteractionEntryForm({ onClose, lead }) {
    const initialState = {
        date: "",
        time: "",
        tagLocation: "",
        type: "",
        note: "",
        description: "",
        appointmentDate: "",
        appointmentTime: "",
        assignedTo: "", // user ID
        appointmentType: "",
    };

    const [interaction, setInteraction] = useState(initialState);
    const [users, setUsers] = useState([]); // ⚡ always an array
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                console.log("Fetched users data:", data);

                const userList = Array.isArray(data)
                    ? data.map(u => ({
                        id: u.id,
                        fullName: u.fullName || u.username || "Unnamed User",
                    }))
                    : [];

                console.log("Processed users:", userList);
                setUsers(userList);
            } catch (err) {
                console.error("Failed to load users:", err);
                setUsers([]);
            }
        };

        loadUsers();
    }, []);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInteraction(prev => ({ ...prev, [name]: value }));
    };

    // Validate required fields
    const validate = () => {
        const newErrors = {};
        if (!interaction.date) newErrors.date = "Date is required";
        if (!interaction.description.trim()) newErrors.description = "Description is required";
        return newErrors;
    };

    // Save interaction
    const handleSave = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            description: interaction.description,
            date: interaction.date,
            time: interaction.time || null,
            tagLocation: interaction.tagLocation || null,
            type: interaction.type || null,
            note: interaction.note || null,
            appointmentDate: interaction.appointmentDate || null,
            appointmentTime: interaction.appointmentTime || null,
            appointmentType: interaction.appointmentType || null,
            lead: { id: lead.id },
            assignedTo: interaction.assignedTo ? { id: interaction.assignedTo } : null
        };

        console.log("Payload to send:", payload);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/interactions", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Interaction saved successfully!");
            setInteraction(initialState);
            setErrors({});
            onClose();
        } catch (err) {
            console.error("Failed to save interaction:", err.response || err.message);
            alert("Error saving interaction. Check console.");
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
                    ></textarea>
                    {errors.description && <span className="error">{errors.description}</span>}

                    <label>Date *</label>
                    <input type="date" name="date" value={interaction.date} onChange={handleChange} />
                    {errors.date && <span className="error">{errors.date}</span>}

                    <label>Time</label>
                    <input type="time" name="time" value={interaction.time} onChange={handleChange} />

                    <label>Tag Location</label>
                    <input type="text" name="tagLocation" value={interaction.tagLocation} onChange={handleChange} />

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
                    <textarea name="note" value={interaction.note} onChange={handleChange}></textarea>
                </div>

                <hr />

                <h2 className="modal-heading">Next Appointment</h2>
                <div className="section-block">
                    <label>Date</label>
                    <input type="date" name="appointmentDate" value={interaction.appointmentDate} onChange={handleChange} />

                    <label>Time</label>
                    <input type="time" name="appointmentTime" value={interaction.appointmentTime} onChange={handleChange} />

                    <label>Assigned To</label>
                    <select
                        name="assignedTo"
                        value={interaction.assignedTo}
                        onChange={(e) => setInteraction(prev => ({ ...prev, assignedTo: e.target.value }))}
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.fullName}</option>
                        ))}
                    </select>

                    <label>Appointment Type</label>
                    <select name="appointmentType" value={interaction.appointmentType} onChange={handleChange}>
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
                    <button className="close-btn" onClick={onClose}>Close</button>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default InteractionEntryForm;
