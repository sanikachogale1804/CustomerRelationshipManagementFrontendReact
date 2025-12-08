import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LeadDetailsModal.css";
import LeadEditForm from "./LeadEditForm";

function LeadDetailsModal({ lead, onClose }) {
  const [openReassign, setOpenReassign] = useState(false);
  const navigate = useNavigate();

  const goToUpdateStatus = () => {
    let leadId;

    if (lead.id) {
      leadId = lead.id;
    } else if (lead._links?.self?.href) {
      // Extract ID from URL
      const parts = lead._links.self.href.split("/");
      leadId = parts[parts.length - 1]; // last part is the ID
    }

    if (leadId) {
      navigate(`/lead/${leadId}/update-status`);
    } else {
      alert("Lead ID not available!");
      console.log("Lead object missing ID:", lead);
    }
  };

  if (!lead) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Provided";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
                <span>
                  {`${lead.firstName || lead.contact?.firstName || ""} ${lead.lastName || lead.contact?.lastName || ""}`.trim() || "Not Provided"}
                </span>
              </div>
              <div className="info-row"><strong>Mobile:</strong> <span>{lead.mobile}</span></div>
              <div className="info-row"><strong>Email:</strong> <span>{lead.email}</span></div>
              <div className="info-row">
                <strong>Website:</strong> <span>{lead.website || "Not Provided"}</span>
              </div>
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
                <button className="action-btn green">+ Quote</button>
                <button className="action-btn green">+ PI</button>
                <button className="action-btn green">+ Order</button>
                <button className="action-btn green">+ Invoice</button>
                <button className="action-btn brown">Business History</button>
              </div>
            </div>

            {/* Reassign Form */}
            {openReassign && <LeadEditForm lead={lead} onClose={() => setOpenReassign(false)} />}

            {/* BUSINESS INTERACTIONS */}
            <div className="section-card">
              <h2 className="section-title">Business Interactions</h2>
              <p className="small-label">Next Appointment</p>
              <div className="interaction-box">
                <button className="interact-btn">+ Enter Interaction</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsModal;
