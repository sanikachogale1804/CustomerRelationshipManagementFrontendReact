import React, { useEffect, useState } from "react";
import { getLeads, getUserByLink } from "../services/leadService";
import "../CSS/Leadlist.css";
import LeadDetailsModal from "./LeadDetailsModal";
import { useNavigate } from "react-router-dom";

export default function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const navigate = useNavigate();

  const handleAddLeadForm = () => {
    navigate("/leadForm"); // Navigate to Add Lead form
  }

  useEffect(() => {
    getLeads()
      .then(async (res) => {
        const data = res?.data?._embedded?.leads || [];

        const updatedLeads = await Promise.all(
          data.map(async (lead) => {
            const assignedToName = await fetchAssignedUserName(lead);
            return { ...lead, assignedToName };
          })
        );

        setLeads(updatedLeads);
      })
      .catch((err) => console.error("Lead fetch error:", err));
  }, []);

  const fetchAssignedUserName = async (lead) => {
    try {
      const userLink = lead?._links?.assignedTo?.href;
      if (!userLink) return "-";

      const res = await getUserByLink(userLink);
      const user = res.data;

      return user.fullName || user.username || "-";
    } catch (err) {
      console.error("Assigned user fetch error", err);
      return "-";
    }
  };


  return (
    <div className="leads-container">
      {/* ----------- TOP BUTTON ROW ----------- */}
      <div className="top-controls">
        <h2 className="lead-heading">Leads & Prospects</h2>
        <div className="top-buttons">
          <button className="filter-btn active">All Active Leads & Prospects</button>
          <button className="filter-btn">Raw</button>
          <button className="filter-btn">New</button>
          <button className="filter-btn">Discussion</button>
          <button className="filter-btn">Demo</button>
          <button className="filter-btn">Proposal</button>
          <button className="filter-btn">Decided</button>
          <button className="filter-btn">Inactive</button>
        </div>
      </div>


      {/* ---------- SEARCH + ADD BUTTON ---------- */}
      <div className="search-row">
        <input className="search-input" placeholder="Search..." />
        <button className="add-btn" onClick={handleAddLeadForm}>+ Add Lead</button>
      </div>

      {/* -------------- TABLE ---------------- */}
      <table className="leads-table">
        <thead>
          <tr>
            <th>Business</th>
            <th>Mobile</th>
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
                <td>{lead.mobile}</td>
                <td>{lead.city}</td>
                <td>{lead.source || "-"}</td>
                <td>{lead.stage || "-"}</td>
                <td>{lead.assignedToName || "-"}</td>
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
