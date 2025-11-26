import React, { useState } from "react";
import styles from "../CSS/Auth.module.css"; 
import logo from "../Images/logo.png";
import { registerUser } from "../services/userService";

const initialState = {
  employeeId: "",
  fullName: "",
  username: "",
  password: "",
  designation: "",
  mobileNo: "",
  dateOfBirth: "",
  dateOfJoining: "",
  workLocation: "",
  Department: "",
  Role: "",
  payrollType: "",
  employmentType: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerUser(form);
      setSuccess("Registration successful!");
      setForm(initialState);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.authPageBackground}>
      <div className={styles.authWrapper}>
        <div className={styles.brandBox}>
          <img src={logo} alt="Logo" className={styles.brandLogo} />
          <h1 className={styles.companyName}>Cogent Safety & Security Pvt Ltd</h1>
          <p className={styles.tagline}>Our Business Is To Protect Yours</p>
        </div>

        <div className={styles.authCard}>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            {/** Employee ID */}
            <div className={styles.inputGroup}>
              <i className="fa fa-user-tie"></i>
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="Employee ID"
                required
              />
            </div>

            {/** Full Name */}
            <div className={styles.inputGroup}>
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            {/** Username */}
            <div className={styles.inputGroup}>
              <i className="fa fa-user-circle"></i>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>

            {/** Password */}
            <div className={styles.inputGroup}>
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            {/** Designation */}
            <div className={styles.inputGroup}>
              <i className="fa fa-id-badge"></i>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Designation"
                required
              />
            </div>

            {/** Mobile Number */}
            <div className={styles.inputGroup}>
              <i className="fa fa-phone"></i>
              <input
                type="number"
                name="mobileNo"
                value={form.mobileNo}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
              />
            </div>

            {/** Date of Birth */}
            <div className={styles.inputGroup}>
              <i className="fa fa-calendar"></i>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            {/** Date of Joining */}
            <div className={styles.inputGroup}>
              <i className="fa fa-calendar-check"></i>
              <input
                type="date"
                name="dateOfJoining"
                value={form.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            {/** Work Location */}
            <div className={styles.inputGroup}>
              <i className="fa fa-map-marker-alt"></i>
              <select
                name="workLocation"
                value={form.workLocation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Work Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Nashik">Nashik</option>
                <option value="Delhi">Delhi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/** Department */}
            <div className={styles.inputGroup}>
              <i className="fa fa-building"></i>
              <select
                name="Department"
                value={form.Department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="HR">HR</option>
                <option value="Operations">Operations</option>
                <option value="Technical">Technical</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
              </select>
            </div>

            {/** Role */}
            <div className={styles.inputGroup}>
              <i className="fa fa-user-tie"></i>
              <select
                name="Role"
                value={form.Role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Executive">Executive</option>
                <option value="Field Officer">Field Officer</option>
                <option value="Security Guard">Security Guard</option>
              </select>
            </div>

            {/** Payroll Type */}
            <div className={styles.inputGroup}>
              <i className="fa fa-money-bill"></i>
              <select
                name="payrollType"
                value={form.payrollType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Payroll Type</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            {/** Employment Type */}
            <div className={styles.inputGroup}>
              <i className="fa fa-briefcase"></i>
              <select
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            {/** Submit Button */}
            <button type="submit" className={styles.authBtn}>Register</button>

            {error && <p style={{color:"red"}}>{error}</p>}
            {success && <p style={{color:"green"}}>{success}</p>}

            <p className={styles.authLink}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
