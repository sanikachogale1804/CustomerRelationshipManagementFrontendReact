import React, { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";

export default function AllLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    getLeads()
      .then((res) => {
        const data = res?.data?._embedded?.leads || [];
        setLeads(data);
      })
      .catch((err) => console.error("Lead fetch error:", err));
  }, []); // <-- IMPORTANT: run only once

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
            <th style={{ width: "20%" }}>Business</th>
            <th style={{ width: "18%" }}>Name</th>
            <th style={{ width: "15%" }}>Mobile</th>
            <th style={{ width: "22%" }}>Email</th>
            <th style={{ width: "12%" }}>City</th>
            <th style={{ width: "13%" }}>Action</th>

          </tr>
        </thead>

        <tbody>
          {leads.length > 0 ? (
            leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.business}</td>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td>{lead.email}</td>
                <td>{lead.city}</td>
                <td>
                  <button className="action-btn">
                    <i className="edit-icon">✏</i>
                  </button>

                  <button className="action-btn">
                    <i className="whatsapp-icon">🟢</i>
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
