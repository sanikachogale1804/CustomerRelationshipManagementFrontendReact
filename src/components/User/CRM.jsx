import React, { useState } from 'react'
import '../CSS/CRM.css'
import Operation_Project from '../Departments/Operation_Project'
import Finance_Account from '../Departments/Finance_Account'
import Sales_Marketing from '../Departments/Sales_Marketing'
import InformationTechnology from '../Departments/InformationTechnology'
import HumanResource from '../Departments/HumanResource'
import Purchase_Logistic from '../Departments/Purchase_logistic'

const departments = [
    "Operation_Project",
    "Finance_Account",
    "Sales_Marketing",
    "Information_Technology",
    "Human_Resource",
    "Purchase_logistic",
]

function CRM() {
  const [selectedDept, setSelectedDept] = useState("");

  const renderPage = () => {
    switch (selectedDept) {
        case "Operation_Project": return <Operation_Project />;
        case "Finance_Account": return <Finance_Account />;
        case "Sales_Marketing": return <Sales_Marketing />;
        case "InformationTechnology": return <InformationTechnology />;
        case "HumanResource": return <HumanResource />;
        case "Purchase_Logistic": return <Purchase_Logistic />;
        default: return <Operation_Project />;
    }
  }

  return (
    <div className='crm-container'>
        <div className='crm-sidebar'>
            <h3>Departments</h3>
            <ul>
                {departments.map((dept)=>(
                    <li 
                      key={dept}
                      className={selectedDept === dept ? 'active' : ""} 
                      onClick={() => setSelectedDept(dept)}
                    >
                        {dept.replace("_", " ")}
                    </li>
                ))}
            </ul>
        </div>

        <div className='dept-section'>{renderPage()}</div>
    </div>
  );
};

export default CRM
