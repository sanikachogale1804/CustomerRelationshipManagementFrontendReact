import React from "react";
import "../CSS/LeadDetailsModal.css";

function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        {/* BIG Business Name */}
        <h1 className="modal-title">{lead.business}</h1>

        {/* Contact Information */}
        <div className="section">
          <h2 className="section-title">Contact Information</h2>

          <div className="info-row">
            <strong>Name:</strong> <span>{lead.name}</span>
          </div>

          <div className="info-row">
            <strong>Mobile:</strong> <span>{lead.mobile}</span>
          </div>

          <div className="info-row">
            <strong>Email:</strong> <span>{lead.email}</span>
          </div>

          <div className="info-row">
            <strong>Website:</strong> <span>{lead.website || "Not Provided"}</span>
          </div>
        </div>

        {/* Business Opportunity */}
        <div className="section">
          <h2 className="section-title">Business Opportunity</h2>
          <p className="opportunity-text">
            {lead.businessOpportunity || "No business opportunity details available."}
          </p>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LeadDetailsModal;
