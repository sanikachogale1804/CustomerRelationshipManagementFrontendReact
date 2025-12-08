import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/LeadStageUpdate.css';

function LeadStageUpdate() {
    const { leadId } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [newStage, setNewStage] = useState("");
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/leads/${leadId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setLead(res.data);
                setNewStage(res.data.stage || "");
            })
            .catch((err) => {
                console.error("Failed to fetch lead:", err);
                alert("You are not authorized to view this lead.");
            });
    }, [leadId]);

    // Update stage
    const handleStageUpdate = async () => {
        if (!newStage) {
            alert("Please select a stage");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const updatedLead = { ...lead, stage: newStage };

            await axios.put(`http://localhost:8080/leads/${leadId}`, updatedLead, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            alert("Stage updated successfully!");
            navigate(-1);
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update stage");
        }
    };

    // Reject lead
    const handleReject = async () => {
        if (!rejectReason) {
            alert("Please enter a reason for rejection");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const updatedLead = { ...lead, stage: "Rejected", rejectReason };

            await axios.put(`http://localhost:8080/leads/${leadId}`, updatedLead, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            alert("Lead rejected successfully!");
            navigate(-1);
        } catch (err) {
            console.error("Reject error:", err);
            alert("Failed to reject lead");
        }
    };

    // Convert to customer
    const handleConvert = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(`http://localhost:8080/leads/${leadId}/convert`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Lead converted to Customer!");
            navigate(-1);
        } catch (err) {
            console.error("Conversion error:", err);
            alert("Conversion failed");
        }
    };

    if (!lead) return <p>Loading...</p>;

    return (
        <div className="update-status-page">
            <h2>Update Status for {lead.Business || lead.business}</h2>

            <div className="current-stage">
                <strong>Current Stage:</strong> {lead.stage || "Not Set"}
            </div>

            <div className="form-row">
                <label>Change Stage to:</label>
                <select value={newStage} onChange={(e) => setNewStage(e.target.value)}>
                    <option value="">Select Stage</option>
                    {[
                        "New",
                        "Discussion",
                        "Demo",
                        "Proposal",
                        "Decided",
                        "Negotiation",
                        "On Hold",
                        "Lost",
                        "Won",
                    ].map((stg) => (
                        <option key={stg} value={stg}>{stg}</option>
                    ))}
                </select>
                <button className="btn green" onClick={handleStageUpdate}>
                    Update
                </button>
            </div>

            <div className="form-row">
                <label>Reject with Reason:</label>
                <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason"
                />
                <button className="btn red" onClick={handleReject}>
                    Reject
                </button>
            </div>

            <div className="form-row">
                <button className="btn blue" onClick={handleConvert}>
                    Convert to Customer
                </button>
            </div>

            <button className="btn grey" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default LeadStageUpdate;
