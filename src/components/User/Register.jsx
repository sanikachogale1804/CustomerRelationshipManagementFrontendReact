import React, { useState } from "react";
import "../CSS/Register.css";
import { registerUser } from "../services/userService";

export default function Register() {
  const [designations, setDesignations] = useState(["HR", "Operations", "IT", "Finance"]);
  const [departments, setDepartments] = useState(["HR", "Operations", "IT", "Finance"]);
  const [payrolls, setPayrolls] = useState(["Monthly", "Weekly", "Daily"]);
  const [employmentTypes, setEmploymentTypes] = useState(["Full-Time", "Part-Time", "Contract"]);

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    username: "",
    password: "",
    designation: "",
    mobileNo: "",
    dob: "",
    doj: "",
    workLocation: "",
    department: "",
    payroll: "",
    employmentType: "",
    aadharCard: null,
    panCard: null,
    photo: null,
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleAddOption = (type) => {
    const val = prompt(`Enter new ${type}`);
    if (!val) return;

    if (type === "Designation") {
      setDesignations([...designations, val]);
      setFormData({ ...formData, designation: val });
    }
    if (type === "Department") {
      setDepartments([...departments, val]);
      setFormData({ ...formData, department: val });
    }
    if (type === "Payroll") {
      setPayrolls([...payrolls, val]);
      setFormData({ ...formData, payroll: val });
    }
    if (type === "Employment Type") {
      setEmploymentTypes([...employmentTypes, val]);
      setFormData({ ...formData, employmentType: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("User Registered Successfully!");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="registerPageBg">
      <div className="registerWrapper">
        <div className="registerCard">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            {/* TEXT INPUTS */}
            {[
              ["Employee ID", "employeeId"],
              ["Full Name", "fullName"],
              ["Email", "email"],
              ["Username", "username"],
              ["Password", "password"],
              ["Mobile Number", "mobileNo"],
            ].map(([label, name], i) => (
              <div className="registerRow" key={i}>
                <label>{label}</label>
                <div className="registerInputBox">
                  <input
                    type={name === "password" ? "password" : "text"}
                    name={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}

            {/* DATE INPUTS */}
            {[
              ["Date of Birth", "dob"],
              ["Date of Joining", "doj"],
            ].map(([label, name], i) => (
              <div className="registerRow" key={i}>
                <label>{label}</label>
                <div className="registerInputBox">
                  <input type="date" name={name} onChange={handleChange} required />
                </div>
              </div>
            ))}

            {/* SELECT WITH PLUS */}
            {[
              ["Designation", "designation", designations],
              ["Department", "department", departments],
              ["Payroll", "payroll", payrolls],
              ["Employment Type", "employmentType", employmentTypes],
            ].map(([label, name, list], i) => (
              <div className="registerRow" key={i}>
                <label>{label}</label>
                <div className="registerInputBox">
                  <select name={name} onChange={handleChange} required>
                    <option value="">Select</option>
                    {list.map((v, idx) => (
                      <option key={idx}>{v}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="registerAddBtn"
                    onClick={() => handleAddOption(label)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* FILE UPLOADS */}
            {["aadharCard", "panCard", "photo", "certificate"].map((f, i) => (
              <div className="registerRow" key={i}>
                <label>{f.toUpperCase()}</label>
                <input type="file" name={f} onChange={handleChange} />
              </div>
            ))}

            <button className="registerBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
