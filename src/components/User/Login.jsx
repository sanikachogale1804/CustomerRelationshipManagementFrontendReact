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
        setError("Invalid Login Response");
      }
    } catch {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className={styles.authPageBackground}>
      <div className={styles.authWrapper}>
        <div className={styles.brandBox}>
          <img src={logo} className={styles.brandLogo} alt="Logo" />
          <h1 className={styles.companyName}>Cogent Safety & Security Pvt Ltd</h1>
          <p className={styles.tagline}>Our Business Is To Protect Yours</p>
        </div>

        <div className={styles.authCard}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.authBtn}>Login</button>
            {error && <p style={{color:'red', marginTop:'10px'}}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
