import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hierarchy from "./components/User/Hierarchy";
import Demo1 from "./components/Ecommerce/Demo";
import CRM from "./components/User/CRM";
import LeadFom from "./components/Sales_Marketing/LeadFom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/CRM" element={<CRM /> } />
        <Route path="/leadForm" element={<LeadFom /> } />
        <Route path="/demo" element={<Demo1 />} />
      </Routes>
    </Router>
  );
}

export default App;
