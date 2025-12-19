import React, { useState } from "react";
import styles from "../CSS/Register.css";
import { registerUser } from "../services/userService";

export default function Register() {
  // Dynamic options
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
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // Add new option dynamically
  const handleAddOption = (type) => {
    const newValue = prompt(`Enter new ${type}:`);
    if (!newValue) return;

    switch (type) {
      case "Designation":
        setDesignations([...designations, newValue]);
        setFormData({ ...formData, designation: newValue });
        break;
      case "Department":
        setDepartments([...departments, newValue]);
        setFormData({ ...formData, department: newValue });
        break;
      case "Payroll":
        setPayrolls([...payrolls, newValue]);
        setFormData({ ...formData, payroll: newValue });
        break;
      case "Employment Type":
        setEmploymentTypes([...employmentTypes, newValue]);
        setFormData({ ...formData, employmentType: newValue });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(formData);
      console.log("User Registered:", result);
      alert("User Registered Successfully!");
      // Optionally, reset form
      setFormData({
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
        certificate: null
      });
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Failed to register user: " + (error.response?.data || error.message));
    }
  };


  return (
    <div className={styles.authPageBackground}>
      <div className={styles.authWrapper}>
        <div className={styles.authCard}>
          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>

            {/* Employee ID */}
            <div className={styles.formRow}>
              <label>Employee ID</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user-tie"></i>
                <input type="text" name="employeeId" placeholder="Employee ID" required onChange={handleChange} />
              </div>
            </div>

            {/* Full Name */}
            <div className={styles.formRow}>
              <label>Full Name</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user"></i>
                <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
              </div>
            </div>

            {/* Email */}
            <div className={styles.formRow}>
              <label>Email ID</label>
              <div className={styles.inputBox}>
                <i className="fa fa-envelope"></i>
                <input type="email" name="email" placeholder="Company Email ID" required onChange={handleChange} />
              </div>
            </div>

            {/* Username */}
            <div className={styles.formRow}>
              <label>Username</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user-circle"></i>
                <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
              </div>
            </div>

            {/* Password */}
            <div className={styles.formRow}>
              <label>Password</label>
              <div className={styles.inputBox}>
                <i className="fa fa-lock"></i>
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
              </div>
            </div>

            {/* Designation with plus button */}
            <div className={styles.formRow}>
              <label>Designation</label>
              <div className={styles.inputBox}>
                <i className="fa fa-id-badge"></i>
                <select name="designation" value={formData.designation} onChange={handleChange} required>
                  <option value="">Select Designation</option>
                  {designations.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
                </select>
                <button type="button" className={styles.addBtn} onClick={() => handleAddOption("Designation")}>➕</button>
              </div>
            </div>

            {/* Mobile */}
            <div className={styles.formRow}>
              <label>Mobile Number</label>
              <div className={styles.inputBox}>
                <i className="fa fa-phone"></i>
                <input type="number" name="mobileNo" placeholder="Mobile Number" required onChange={handleChange} />
              </div>
            </div>

            {/* DOB */}
            <div className={styles.formRow}>
              <label>Date of Birth</label>
              <div className={styles.inputBox}>
                <i className="fa fa-calendar"></i>
                <input type="date" name="dob" required onChange={handleChange} />
              </div>
            </div>

            {/* DOJ */}
            <div className={styles.formRow}>
              <label>Date of Joining</label>
              <div className={styles.inputBox}>
                <i className="fa fa-calendar-check"></i>
                <input type="date" name="doj" required onChange={handleChange} />
              </div>
            </div>

            {/* Work Location */}
            <div className={styles.formRow}>
              <label>Work Location</label>
              <div className={styles.inputBox}>
                <i className="fa fa-map-marker-alt"></i>
                <select name="workLocation" value={formData.workLocation} onChange={handleChange} required>
                  <option value="">Select Work Location</option>
                  <option>Mumbai</option>
                  <option>Hyderabad</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>

            {/* Department with plus button */}
            <div className={styles.formRow}>
              <label>Department</label>
              <div className={styles.inputBox}>
                <i className="fa fa-building"></i>
                <select name="department" value={formData.department} onChange={handleChange} required>
                  <option value="">Select Department</option>
                  {departments.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
                </select>
                <button type="button" className={styles.addBtn} onClick={() => handleAddOption("Department")}>➕</button>
              </div>
            </div>

            {/* Payroll with plus */}
            <div className={styles.formRow}>
              <label>Payroll Type</label>
              <div className={styles.inputBox}>
                <i className="fa fa-money-bill"></i>
                <select name="payroll" value={formData.payroll} onChange={handleChange} required>
                  <option value="">Select Payroll</option>
                  {payrolls.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
                </select>
                <button type="button" className={styles.addBtn} onClick={() => handleAddOption("Payroll")}>➕</button>
              </div>
            </div>

            {/* Employment Type with plus */}
            <div className={styles.formRow}>
              <label>Employment Type</label>
              <div className={styles.inputBox}>
                <i className="fa fa-briefcase"></i>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                  <option value="">Select Employment Type</option>
                  {employmentTypes.map((e, idx) => <option key={idx} value={e}>{e}</option>)}
                </select>
                <button type="button" className={styles.addBtn} onClick={() => handleAddOption("Employment Type")}>➕</button>
              </div>
            </div>

            {/* File uploads */}
            <div className={styles.formRow}>
              <label>Aadhar Card</label>
              <input type="file" name="aadharCard" accept=".pdf,.jpg,.png" onChange={handleChange} />
            </div>

            <div className={styles.formRow}>
              <label>PAN Card</label>
              <input type="file" name="panCard" accept=".pdf,.jpg,.png" onChange={handleChange} />
            </div>

            <div className={styles.formRow}>
              <label>Photo</label>
              <input type="file" name="photo" accept=".jpg,.png" onChange={handleChange} />
            </div>

            <div className={styles.formRow}> 
              <label>Certificate</label>
              <input type="file" name="certificate" accept=".pdf,.jpg,.png" onChange={handleChange}/>

            </div>

            {/* Submit */}
            <button type="submit" className={styles.authBtn}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
