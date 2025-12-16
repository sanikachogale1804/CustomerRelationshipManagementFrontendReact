import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Components
import AdminDashboard from "./components/Admin/AdminDashboard";
import Reports from "./components/Admin/Reports";
import Settings from "./components/Admin/Settings";
import ManageUsers from "./components/Admin/ManageUsers";
import ChangePassword from "./components/Admin/ChangePassword";
import ManageUserEdit from "./components/Admin/ManageUserEdit";
import Permission from "./components/Admin/Permission";
import AuditLogs from "./components/Admin/AuditLogs";

// Sales & Marketing Components
import SalesMarketing from "./components/Sales_Marketing/SalesMarketing";
import LeadFom from "./components/Sales_Marketing/LeadFom";
import LeadList from "./components/Sales_Marketing/LeadList";
import LeadStageUpdate from "./components/Sales_Marketing/LeadStageUpdate";
import QuotationForm from "./components/Sales_Marketing/QuotationForm";
import ItemSelectionPage from "./components/Sales_Marketing/ItemSelectionPage";
import AddStockItemForm from "./components/Sales_Marketing/AddStockItemForm";

// User / Other Components
import Hierarchy from "./components/User/Hierarchy";
import Demo1 from "./components/Ecommerce/Demo";
import CRM from "./components/User/CRM";
import Register from "./components/User/Register";
import Login from "./components/User/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* ------------------ General Routes ------------------ */}
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/CRM" element={<CRM />} />
        <Route path="/leadForm" element={<LeadFom />} />
        <Route path="/lead/:leadId/update-status" element={<LeadStageUpdate />} />
        <Route path="/demo" element={<Demo1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/permission" element={<Permission />} />
        {/* <Route path="/quotationForm" element={<QuotationForm />} /> */}
        <Route path="/select-item" element={<ItemSelectionPage />} />
        <Route path="/add-stock-item" element={<AddStockItemForm />} />

        {/* ------------------ Admin Dashboard ------------------ */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/create-user" element={<Register />} />
          <Route path="settings/manage-permissions" element={<Permission />} />
          <Route path="settings/manage-users" element={<ManageUsers />} />
          <Route path="settings/manage-users-edit/:id" element={<ManageUserEdit />} />
          <Route path="settings/change-password" element={<ChangePassword />} />
          <Route path="settings/audit-logs" element={<AuditLogs />} />

          {/* Sales & Marketing inside Admin */}
          <Route path="leadList" element={<LeadList />} />
          <Route path="leadForm" element={<LeadFom />} />
          <Route path="quotationForm" element={<QuotationForm />} />
        </Route>

        {/* Sales Marketing Direct */}
        <Route path="/sales" element={<SalesMarketing />} />
      </Routes>
    </Router>
  );
}

export default App;
