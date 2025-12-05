import React, { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import "../CSS/Leadlist.css";
import LeadDetailsModal from "./LeadDetailsModal";

export default function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);


  useEffect(() => {
    getLeads()
      .then((res) => {
        const data = res?.data?._embedded?.leads || [];
        setLeads(data);
      })
      .catch((err) => console.error("Lead fetch error:", err));
  }, []);

  // Helper to get assignedTo name
  const getAssignedToName = (assignedTo) => {
    if (!assignedTo) return "";
    // If it's a HAL link, you might need to extract numeric ID
    if (typeof assignedTo === "string" && assignedTo.includes("/")) {
      return assignedTo.split("/").pop(); // or fetch user name if needed
    }
    // If it's an object with fullName
    if (assignedTo.fullName) return assignedTo.fullName;
    if (assignedTo.username) return assignedTo.username;
    return assignedTo;
  };

  return (
    <div className="leads-container">
      {/* ----------- TOP BUTTON ROW ----------- */}
      <div className="top-controls">
        <button className="filter-btn active">All Active Leads & Prospects</button>
        <button className="filter-btn">Raw</button>
        <button className="filter-btn">New</button>
        <button className="filter-btn">Discussion</button>
        <button className="filter-btn">Demo</button>
        <button className="filter-btn">Proposal</button>
        <button className="filter-btn">Decided</button>
        <button className="filter-btn">Inactive</button>
      </div>

      {/* ---------- SEARCH + ADD BUTTON ---------- */}
      <div className="search-row">
        <input className="search-input" placeholder="Search..." />
        <button className="add-btn">+ Add Lead</button>
      </div>

      {/* -------------- TABLE ---------------- */}
      <table className="leads-table">
        <thead>
          <tr>
            <th>Business</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>Source</th>
            <th>Stage</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length > 0 ? (
            leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.business}</td>
                <td>{lead.fullName}</td>
                <td>{lead.mobile}</td>
                <td>{lead.email}</td>
                <td>{lead.city}</td>
                <td>{lead.source || "-"}</td>
                <td>{lead.stage || "-"}</td>
                <td>{getAssignedToName(lead.assignedTo) || "-"}</td>
                <td className="action-col">
                  <button
                    className="square-btn edit-square"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                  <button className="square-btn whatsapp-square">
                    <i className="fa-brands fa-whatsapp"></i>

                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
