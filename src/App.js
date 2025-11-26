import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hierarchy from "./components/User/Hierarchy";
import Demo1 from "./components/Ecommerce/Demo";
import CRM from "./components/User/CRM";
import LeadFom from "./components/Sales_Marketing/LeadFom";
import LeadList from "./components/Sales_Marketing/LeadList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/CRM" element={<CRM /> } />
        <Route path="/leadForm" element={<LeadFom /> } />
        <Route path="/leadList" element={<LeadList /> } />
        <Route path="/demo" element={<Demo1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
