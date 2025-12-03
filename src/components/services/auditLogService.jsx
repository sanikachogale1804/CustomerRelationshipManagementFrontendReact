let logs = [
  {
    id: 1,
    timestamp: "2025-12-03 11:30",
    user: "John Doe",
    action: "Update",
    module: "Users",
    description: "Changed permissions for Mary",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2025-12-03 10:15",
    user: "Admin",
    action: "Create",
    module: "Reports",
    description: "Created new monthly report",
    status: "Success",
  },
  {
    id: 3,
    timestamp: "2025-12-02 18:40",
    user: "Alice",
    action: "Login Failed",
    module: "Authentication",
    description: "Invalid password attempt",
    status: "Failed",
  },
];

// Simulate GET request
export const getAuditLogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...logs]);
    }, 300); // simulate network delay
  });
};

// Simulate POST request
export const addAuditLog = async (log) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
        ...log,
      };
      logs = [newLog, ...logs]; // add to top
      resolve(newLog);
    }, 300);
  });
};