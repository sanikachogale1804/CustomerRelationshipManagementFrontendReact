import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import '../CSS/Admin.css';
import logo from '../Images/logo.png';

export default function AdminDashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const defaultDepartments = [
    { name: "Sales & Marketing", route: "leadList" },
    { name: "Operation & Project", route: "OperationProject" },
    { name: "Human Resource", route: "HR" },
    { name: "Information Technology", route: "IT" },
    { name: "Finance & Accounts", route: "Finance" },
    { name: "Procurement", route: "Procurement" },
    { name: "Customer Support", route: "CustomerSupport" },
  ];

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar fixed-sidebar">
        <div className="logo-section">
          <img src={logo} alt="Company Logo" className="company-logo-free" />
          <h2 className="company-name">Cogent Safety & Security Pvt Ltd</h2>
        </div>

        <ul className="menu-list">
          <li className="menu-item"><Link to="">Dashboard</Link></li>
          <li className="menu-item"><Link to="reports">Reports</Link></li>
          <li className="menu-item"><Link to="settings">Settings</Link></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR */}
        {isAdminPage && (
          <div className="top-bar">
            <div className="dept-left-box">
              <label className="dept-label">Department:</label>
              <select
                className="departments-dropdown"
                defaultValue=""
                onChange={(e) => navigate(`/admin/${e.target.value}`)}
              >
                <option value="" disabled>Select Department</option>
                {defaultDepartments.map((d, i) => (
                  <option key={i} value={d.route}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="top-right">
              <button
                className="notif-btn"
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              >🔔</button>

              {notifOpen && (
                <div className="notif-popup">
                  <p>No new notifications</p>
                </div>
              )}

              <button
                className="profile-btn"
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              >
                Profile
              </button>

              {profileOpen && (
                <div className="profile-popup">
                  <button>Edit Profile</button>
                  <button>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
