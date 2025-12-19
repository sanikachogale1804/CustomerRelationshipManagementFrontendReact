
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LeadDetailsModal.css";
import LeadEditForm from "./LeadEditForm";
import InteractionEntryForm from "./InteractionEntryForm";
import AppointmentEditor from "./AppointmentEditor";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";

function LeadDetailsModal({ lead, onClose }) {
  const [openReassign, setOpenReassign] = useState(false);
  const [openInteraction, setOpenInteraction] = useState(false);
  const [openAppointmentEditor, setOpenAppointmentEditor] = useState(false);
  const [reminderText, setReminderText] = useState(""); // ✅ reminder state

  const navigate = useNavigate();

  if (!lead) return null;

  // Normalize lead.id
  if (!lead.id && lead._links?.self?.href) {
    const parts = lead._links.self.href.split("/");
    lead.id = parseInt(parts[parts.length - 1], 10);
  }

  const goToUpdateStatus = () => {
    if (lead.id) {
      navigate(`/lead/${lead.id}/update-status`);
    } else {
      alert("Lead ID not available!");
      console.log("Lead object missing ID:", lead);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Provided";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Send Reminder handler
  const handleSendReminder = async () => {
    if (!reminderText.trim()) {
      alert("Please enter a reminder/question before sending.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        lead: { id: lead.id },
        message: reminderText,
      };

      const response = await axios.post(
        "http://localhost:8080/reminders", // adjust your backend endpoint
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.data?.id) {
        alert("Reminder sent successfully!");
        setReminderText(""); // clear input
      } else {
        alert("Error sending reminder: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error("Error sending reminder:", err);
      alert("Failed to send reminder. Check console.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box-wide">
        {/* HEADER */}
        <div className="header-row">
          <h1 className="modal-title">{lead.Business}</h1>
          <button className="close-x" onClick={onClose}>×</button>
        </div>

        <div className="modal-grid">
          {/* LEFT PANEL */}
          <div className="left-panel">
            <div className="section-card">
              <h2 className="section-title">Contact Information</h2>
              <div className="info-row">
                <strong>Name:</strong>
                <span>{`${lead.firstName || lead.contact?.firstName || ""} ${lead.lastName || lead.contact?.lastName || ""}`.trim() || "Not Provided"}</span>
              </div>
              <div className="info-row"><strong>Mobile:</strong> <span>{lead.mobile}</span></div>
              <div className="info-row"><strong>Email:</strong> <span>{lead.email}</span></div>
              <div className="info-row"><strong>Website:</strong> <span>{lead.website || "Not Provided"}</span></div>
            </div>

            <div className="section-card">
              <h2 className="section-title">Business Opportunity</h2>
              <div className="info-row"><strong>Received On:</strong> <span>{formatDate(lead.since)}</span></div>
              <div className="info-row"><strong>Source:</strong> <span>{lead.source || "Not Provided"}</span></div>
              <div className="info-row"><strong>Interested In:</strong> <span>{lead.category || "Not Provided"}</span></div>
              <div className="info-row"><strong>Requirement:</strong> <span>{lead.requirement || "Not Provided"}</span></div>
              <div className="info-row"><strong>Code:</strong> <span>{lead.code || "Not Provided"}</span></div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">
            <div className="section-card">
              <h2 className="section-title">Actions</h2>
              <div className="actions-row">
                <button className="action-btn grey" onClick={() => setOpenReassign(true)}>Reassign</button>
                <button className="action-btn blue" onClick={goToUpdateStatus}>Update Status</button>
                <button
                  className="action-btn green"
                  onClick={() => navigate("/admin/quotationForm")}
                >
                  + Quote
                </button>

                <button className="action-btn green">+ PI</button>
                <button className="action-btn green">+ Order</button>
                <button className="action-btn green">+ Invoice</button>
                <button className="action-btn brown">Business History</button>
              </div>
            </div>

            {openReassign && <LeadEditForm lead={lead} onClose={() => setOpenReassign(false)} />}

            {/* BUSINESS INTERACTIONS */}
            <div className="section-card">
              <h2 className="section-title">Business Interactions</h2>

              {/* Next Appointment + Pencil */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="small-label">Next Appointment</p>
                <FaPencilAlt
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenAppointmentEditor(true)}
                  title="Edit Appointment"
                />
              </div>

              {/* Enter Interaction */}
              <div className="interaction-box" style={{ marginTop: "10px" }}>
                <button className="interact-btn" onClick={() => setOpenInteraction(true)}>
                  + Enter Interaction
                </button>
              </div>

              {/* Reminder Section */}
              <div className="reminder-section" style={{ marginTop: "20px" }}>
                <label><strong>Reminder to {lead.Business}</strong></label>
                <textarea
                  placeholder="Enter your reminder or question..."
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                    resize: "vertical"
                  }}
                />
                <button
                  className="save-btn"
                  style={{ marginTop: "10px" }}
                  onClick={handleSendReminder}
                >
                  Send
                </button>
              </div>
            </div>

            {openInteraction && (
              <InteractionEntryForm
                lead={lead}
                onClose={() => setOpenInteraction(false)}
              />
            )}

            {openAppointmentEditor && (
              <AppointmentEditor
                lead={lead}
                onClose={() => setOpenAppointmentEditor(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsModal;
