import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

const Hierarchy = () => {
  const [tree, setTree] = useState([]);

  const buildHierarchy = (users) => {
    const map = {};
    const roots = [];

    users.forEach((user) => {
      map[user.id] = { ...user, children: [] };
    });

    users.forEach((user) => {
      if (user.reportingToId && map[user.reportingToId]) {
        map[user.reportingToId].children.push(map[user.id]);
      } else {
        roots.push(map[user.id]);
      }
    });

    return roots;
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();

        // Manual reporting setup
        const transformedUsers = data.map((u) => {
          const id = parseInt(u._links.self.href.split("/").pop());

          // Define reporting relationships
          let reportingToId = null;
          switch (u.fullName) {
            case "User":
              reportingToId = 11; // User reports to Supervisor
              break;
            case "Supervisor":
              reportingToId = 12; // Supervisor reports to Manager
              break;
            case "Manager":
              reportingToId = 13; // Manager reports to HeadOfDepartment
              break;
            case "HeadOfDepartment":
              reportingToId = 14; // HeadOfDepartment reports to Admin (CEO)
              break;
            case "Admin":
            case "Admin2":
              reportingToId = null; // Both at top level
              break;
            default:
              reportingToId = null;
          }

          return {
            id,
            fullName: u.fullName,
            designation: u.designation,
            reportingToId,
          };
        });

        setTree(buildHierarchy(transformedUsers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const TreeNode = ({ node }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <li>
        <span
          style={{ cursor: node.children.length > 0 ? "pointer" : "default" }}
          onClick={() => node.children.length > 0 && setOpen(!open)}
        >
          {node.children.length > 0 ? (open ? "▼ " : "► ") : "• "}
          {node.fullName} ({node.designation})
        </span>

        {open && node.children.length > 0 && (
          <ul>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div>
      <h2>CRM Users Hierarchy</h2>
      {tree.length > 0 ? (
        <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
          {tree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Hierarchy;
