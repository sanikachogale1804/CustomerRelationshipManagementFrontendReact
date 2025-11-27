import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/Sales.css'

export default function SalesMarketing() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="sales-container">
      {/* Top Bar */}
      <div className="top-bar-department">
        <div className="top-left">
          <button className="back-btn" onClick={() => navigate("/admin")}>
            🔙 Back to Dashboard
          </button>
        </div>

        <div className="top-right">
          <button
            className="notif-btn"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
          >
            🔔
          </button>
          {notifOpen && (
            <div className="notif-popup">
              <p>No new notifications</p>
            </div>
          )}

          <button
            className="profile-btn"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
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

      <div className="department-content">
        <h2>Sales & Marketing Department</h2>
        <p>Yaha Sales & Marketing ka dashboard content dikhega.</p>
      </div>
    </div>
  );
}