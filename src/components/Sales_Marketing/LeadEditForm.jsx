import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/LeadForm.css";
import { Country, State } from "country-state-city";
import { fetchUsers } from "../services/userService";

function LeadEditForm({ lead, onClose }) {
    const [form, setForm] = useState({});
    const [countries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (lead) {
            // 1️⃣ Set form with existing database values
            setForm({
                ...lead,
                country: lead.country || "",
                state: lead.state || "",
                city: lead.city || "",
                assignedTo: lead.assignedTo?._links?.self?.href || lead.assignedTo || "",
            });

            // 2️⃣ Load STATE values if country exists
            if (lead.country) {
                const stateList = State.getStatesOfCountry(lead.country);
                setStates(stateList);
            }
        }

        // 3️⃣ Load USERS
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error("User fetch failed:", err);
            }
        };

        loadUsers();
    }, [lead]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "country") {
            setStates(State.getStatesOfCountry(value));
        }

        if (name === "pincode" && value.length === 6) {
            fetchPincodeDetails(value);
        }
    };


    const updateLead = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(lead._links.self.href, form, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                alert("Lead updated successfully!");
                onClose();
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update lead!");
        }
    };

    const fetchPincodeDetails = async (pincode) => {
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await res.json();

            if (data[0].Status === "Success") {
                const info = data[0].PostOffice[0];

                setForm((prev) => ({
                    ...prev,
                    city: info.District,
                    state: info.State,
                    country: "India",
                }));
            } else {
                setErrors((prev) => ({ ...prev, pincode: "Invalid Pincode" }));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box-wide">
                <div className="header-row">
                    <h2>Edit Lead</h2>
                    <button className="close-x" onClick={onClose}>×</button>
                </div>

                <form className="Lead-Form" onSubmit={updateLead}>
                    <h4>Core Data</h4>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Business *</label>
                            <input name="Business" value={form.Business || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" value={form.address || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input name="firstName" value={form.firstName || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Last Name *</label>
                            <input name="lastName" value={form.lastName || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Designation</label>
                            <input name="designation" value={form.designation || ""} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Country, State, City, Mobile, Email, GSTIN, Pincode, Website */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Country</label>
                            <select name="country" value={form.country || ""} onChange={handleChange}>
                                <option value="">Select Country</option>
                                {countries.map((c) => (
                                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input name="city" value={form.city || ""} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>State</label>
                            <select name="state" value={form.state || ""} onChange={handleChange}>
                                <option value="">Select State</option>
                                {states.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Mobile *</label>
                            <input name="mobile" value={form.mobile || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input name="email" value={form.email || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>GSTIN</label>
                            <input name="gstin" value={form.gstin || ""} onChange={handleChange} />
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group">
                            <label>Pincode</label>
                            <input name="pincode" value={form.pincode || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Website</label>
                            <input name="website" value={form.website || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Code</label>
                            <input name="code" value={form.code || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <h4>Business Opportunity</h4>

                    <div className="form-row">
                        <select name="source" value={form.source || ""} onChange={handleChange}>
                            <option value="">Select Source</option>
                            {[
                                "Website Enquiry", "Social Media", "LinkedIn", "Facebook",
                                "Instagram", "Google Search", "Cold Call", "Reference",
                                "Existing Customer", "WhatsApp", "Email Campaign",
                                "Field Visit", "Trade Show / Expo", "Partner / Distributor", "Other"
                            ].map((src, i) => (
                                <option key={i} value={src}>{src}</option>
                            ))}
                        </select>

                        <div className="form-group">
                            <label>Since</label>
                            <input type="date" name="since" value={form.since || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <select name="requirement" value={form.requirement || ""} onChange={handleChange}>
                            <option value="">Select Requirement</option>
                            {[
                                "VMS & CCTV", "VMS", "CCTV", "VMS+CC", "CC", "ACS",
                                "ITC & Networking", "CCTV & CC", "CCTV & FAS", "Bollards",
                                "ELV", "AELV", "Networking", "CCTV"
                            ].map((req, i) => (
                                <option key={i} value={req}>{req}</option>
                            ))}
                        </select>

                        <select name="category" value={form.category || ""} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {["Service", "Product", "Service & Product"].map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Notes</label>
                            <input name="notes" value={form.notes || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Product</label>
                            <input name="product" value={form.product || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Potential</label>
                            <input name="potential" value={form.potential || ""} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Assigned To</label>
                            <select
                                name="assignedTo"
                                value={form.assignedTo || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select User</option>
                                {users.map((u) => (
                                    <option key={u._links.self.href} value={u._links.self.href}>
                                        {u.fullName || u.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <select name="stage" value={form.stage || ""} onChange={handleChange}>
                            <option value="">Select Stage</option>
                            {[
                                "New", "Discussion", "Demo", "Proposal",
                                "Decided", "Negotiation", "On Hold", "Lost", "Won"
                            ].map((stg, i) => (
                                <option key={i} value={stg}>{stg}</option>
                            ))}
                        </select>

                        <div className="form-group">
                            <label>Tags</label>
                            <input name="tags" value={form.tags || ""} onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit">Update Lead</button>
                </form>
            </div>
        </div>
    );
}

export default LeadEditForm;
