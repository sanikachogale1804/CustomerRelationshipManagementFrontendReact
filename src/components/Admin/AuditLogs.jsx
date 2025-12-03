import React, { useState, useEffect } from "react";
import "../CSS/AuditLogs.css"; // Use your CSS for styling
import { addAuditLog, getAuditLogs } from "../services/auditLogService";


export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterUser, setFilterUser] = useState("");

  // Form for new log (demo POST)
  const [newLog, setNewLog] = useState({
    user: "Admin",
    action: "Create",
    module: "Users",
    description: "Created new user",
    status: "Success",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  // Fetch logs (GET)
  const fetchLogs = async () => {
    const data = await getAuditLogs();
    setLogs(data);
    setFilteredLogs(data);
  };

  // Handle search & filters
  useEffect(() => {
    let temp = [...logs];

    if (search) {
      temp = temp.filter(
        (log) =>
          log.user.toLowerCase().includes(search.toLowerCase()) ||
          log.module.toLowerCase().includes(search.toLowerCase()) ||
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterAction) temp = temp.filter((log) => log.action === filterAction);
    if (filterUser) temp = temp.filter((log) => log.user === filterUser);

    setFilteredLogs(temp);
  }, [search, filterAction, filterUser, logs]);

  // Unique users & actions
  const uniqueUsers = [...new Set(logs.map((log) => log.user))];
  const uniqueActions = [...new Set(logs.map((log) => log.action))];

  // Add new log (demo POST)
  const handleAddLog = async () => {
    const addedLog = await addAuditLog(newLog);
    setLogs((prev) => [addedLog, ...prev]);
    setNewLog({ ...newLog, description: "" }); // reset description
  };

  return (
    <div className="audit-container">
      <h2>Audit Logs</h2>

      {/* Demo Add Log */}
      <div className="audit-add-log">
        <input
          type="text"
          placeholder="Description"
          value={newLog.description}
          onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
        />
        <button onClick={handleAddLog}>Add Log</button>
      </div>

      {/* Filters */}
      <div className="audit-filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
          <option value="">All Users</option>
          {uniqueUsers.map((user, idx) => (
            <option key={idx} value={user}>{user}</option>
          ))}
        </select>
        <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)}>
          <option value="">All Actions</option>
          {uniqueActions.map((action, idx) => (
            <option key={idx} value={action}>{action}</option>
          ))}
        </select>
      </div>

      {/* Logs Table */}
      <div className="audit-table-wrapper">
        <table className="audit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No logs found</td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className={
                  log.status === "Failed" ? "failed-row" :
                  log.status === "Pending" ? "pending-row" :
                  "success-row"
                }>
                  <td>{log.id}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.module}</td>
                  <td>{log.description}</td>
                  <td>{log.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
