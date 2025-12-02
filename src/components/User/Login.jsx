import React, { useState } from "react";
import styles from "../CSS/Login.module.css";
import logo from '../Images/logo.png';
import { loginUser } from "../services/userService";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      if (response) {
        localStorage.setItem("token", response);
        window.location.href = "/admin";
      } else {
        setError("Invalid Credentials");
      }
    } catch {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className={styles.authPageBackground}> {/* FULL SCREEN BACKGROUND */}
      <div className={styles.loginWrapper}> {/* Wrapper */}
        
        {/* Brand Section */}
        <div className={styles.brandBox}>
          <img src={logo} className={styles.logo} alt="Company Logo" />
          <h1 className={styles.companyName}>Cogent Safety & Security Pvt Ltd</h1>
          <p className={styles.tagline}>Our Business Is To Protect Yours</p>
        </div>

        {/* Login Card */}
        <div className={styles.loginCard}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            
            {/* Username */}
            <div className={styles.inputGroup}>
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.loginBtn}>Login</button>

            {/* Links */}
            <div className={styles.links}>
              <a href="#">Forgot Password?</a>
              <a href="#">Contact Admin</a>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
