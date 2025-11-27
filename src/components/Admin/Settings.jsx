import React from "react";
import { Link, Outlet } from "react-router-dom";
import '../CSS/Settings.css'

// Settings options with icons (emoji symbols)
const settingsOptions = [
  { name: "Create User", link: "create-user", icon: "👤" },
  { name: "Manage Permissions", link: "manage-permissions", icon: "🔑" },
  { name: "Change Password", link: "change-password", icon: "🔒" },
  { name: "Manage Users", link: "manage-users", icon: "🧑‍🤝‍🧑" },
  { name: "Audit Logs", link: "audit-logs", icon: "📜" },
];

export default function Settings() {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>Here you can manage application preferences, users, permissions, etc.</p>

      <div className="settings-vertical">
        {settingsOptions.map((option, idx) => (
          <Link key={idx} to={option.link} className="settings-card-vertical">
            <span className="settings-icon">{option.icon}</span>
            <span className="settings-text">{option.name}</span>
          </Link>
        ))}
      </div>

      {/* This is where child route (Register, Permission, etc.) will render */}
      <div className="settings-child-content">
        <Outlet />
      </div>
    </div>
  );
}
