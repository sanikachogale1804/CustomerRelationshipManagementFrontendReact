import React from "react";
import styles from "../CSS/Auth.module.css";

export default function Register() {
  return (
    <div className={styles.authPageBackground}>
      <div className={styles.authWrapper}>
        <div className={styles.authCard}>
          <h2>Create an Account</h2>

          <form>

            {/* Employee ID */}
            <div className={styles.formRow}>
              <label>Employee ID</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user-tie"></i>
                <input type="text" placeholder="Employee ID" required />
              </div>
            </div>

            {/* Full Name */}
            <div className={styles.formRow}>
              <label>Full Name</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user"></i>
                <input type="text" placeholder="Full Name" required />
              </div>
            </div>

            {/* Email */}
            <div className={styles.formRow}>
              <label>Email ID</label>
              <div className={styles.inputBox}>
                <i className="fa fa-envelope"></i>
                <input type="email" placeholder="Company Email ID" required />
              </div>
            </div>

            {/* Username */}
            <div className={styles.formRow}>
              <label>Username</label>
              <div className={styles.inputBox}>
                <i className="fa fa-user-circle"></i>
                <input type="text" placeholder="Username" required />
              </div>
            </div>

            {/* Password */}
            <div className={styles.formRow}>
              <label>Password</label>
              <div className={styles.inputBox}>
                <i className="fa fa-lock"></i>
                <input type="password" placeholder="Password" required />
              </div>
            </div>

            {/* Designation */}
            <div className={styles.formRow}>
              <label>Designation</label>
              <div className={styles.inputBox}>
                <i className="fa fa-id-badge"></i>
                <input type="text" placeholder="Designation" required />
              </div>
            </div>

            {/* Mobile */}
            <div className={styles.formRow}>
              <label>Mobile Number</label>
              <div className={styles.inputBox}>
                <i className="fa fa-phone"></i>
                <input type="number" placeholder="Mobile Number" required />
              </div>
            </div>

            {/* DOB */}
            <div className={styles.formRow}>
              <label>Date of Birth</label>
              <div className={styles.inputBox}>
                <i className="fa fa-calendar"></i>
                <input type="date" required />
              </div>
            </div>

            {/* DOJ */}
            <div className={styles.formRow}>
              <label>Date of Joining</label>
              <div className={styles.inputBox}>
                <i className="fa fa-calendar-check"></i>
                <input type="date" required />
              </div>
            </div>

            {/* Work Location */}
            <div className={styles.formRow}>
              <label>Work Location</label>
              <div className={styles.inputBox}>
                <i className="fa fa-map-marker-alt"></i>
                <select required>
                  <option disabled selected>Select Work Location</option>
                  <option>Mumbai</option>
                  <option>Hyderabad</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div className={styles.formRow}>
              <label>Department</label>
              <div className={styles.inputBox}>
                <i className="fa fa-building"></i>
                <select required>
                  <option disabled selected>Select Department</option>
                  <option>HR</option>
                  <option>Operations</option>
                  <option>IT</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>

            {/* Payroll */}
            <div className={styles.formRow}>
              <label>Payroll Type</label>
              <div className={styles.inputBox}>
                <i className="fa fa-money-bill"></i>
                <select required>
                  <option disabled selected>Select Payroll</option>
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>

            {/* Employment Type */}
            <div className={styles.formRow}>
              <label>Employment Type</label>
              <div className={styles.inputBox}>
                <i className="fa fa-briefcase"></i>
                <select required>
                  <option disabled selected>Employment Type</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={styles.authBtn}>
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
