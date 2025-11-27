import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hierarchy from "./components/User/Hierarchy";
import Demo1 from "./components/Ecommerce/Demo";
import CRM from "./components/User/CRM";
import LeadFom from "./components/Sales_Marketing/LeadFom";
import LeadList from "./components/Sales_Marketing/LeadList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Permission from "./components/User/Permission";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Reports from "./components/Admin/Reports";
import Settings from "./components/Admin/Settings";
import ManageUsers from "./components/Admin/ManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/CRM" element={<CRM />} />
        <Route path="/leadForm" element={<LeadFom />} />
        <Route path="/leadList" element={<LeadList />} />
        <Route path="/demo" element={<Demo1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/permission" element={<Permission />} />
        // App.js
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/create-user" element={<Register />} />
          <Route path="settings/manage-permissions" element={<Permission />} />
          <Route path="settings/manage-users" element={<ManageUsers />}/>
        </Route>



      </Routes>
    </Router>
  );
}

export default App;
