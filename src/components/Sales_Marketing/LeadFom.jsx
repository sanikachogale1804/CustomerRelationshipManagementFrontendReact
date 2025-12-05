import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../services/leadService';
import axios from 'axios';
import '../CSS/LeadForm.css';
import { Country, State } from 'country-state-city';
import { fetchUsers } from '../services/userService';

function LeadForm() {
  const initialState = {
    business: "",
    address: "",
    name: "",
    designation: "",
    country: "",
    city: "",
    state: "",
    mobile: "",
    email: "",
    gstin: "",
    pincode: "",
    website: "",
    code: "",
    source: "",
    since: "",
    requirement: "",
    category: "",
    notes: "",
    product: "",
    potential: "",
    assignedTo: "",
    stage: "",
    tags: ""
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.country);
  const [users, setUsers] = useState([]);

  const sourceOptions = [
    "Website Enquiry",
    "Social Media",
    "LinkedIn",
    "Facebook",
    "Instagram",
    "Google Search",
    "Cold Call",
    "Reference",
    "Existing Customer",
    "WhatsApp",
    "Email Campaign",
    "Field Visit",
    "Trade Show / Expo",
    "Partner / Distributor",
    "Other"
  ];

  const requirementOptions = [
    "VMS & CCTV",
    "VMS",
    "CCTV",
    "VMS+CC",
    "CC",
    "ACS",
    "ITC & Networking",
    "CCTV & CC",
    "CCTV & FAS",
    "Bollards",
    "ELV",
    "AELV",
    "Networking",
    "CCTV"
  ]

  const categoryOptions = [
    "Service",
    "Product",
    "Service & Product"
  ]

  const stageOptions = [
    "New",
    "Discussion",
    "Demo",
    "Proposal",
    "Decided",
    "Negotiation",
    "On Hold",
    "Lost",
    "Won"
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); // Already returns array
        console.log("Users API response in LeadForm:", usersData);
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to fetch users in LeadForm:", err);
      }
    };

    getUsers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "pincode") {
      fetchPincodeDetails(value);
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!form.business.trim()) newErrors.business = "Business is required";
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile is required";
    else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Mobile must be 10 digits";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.requirement.trim()) newErrors.requirement = "Requirement is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.source.trim()) newErrors.category = "Source is required";

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        assignedTo: form.assignedTo || null // send HAL URI directly
      };

      const res = await axios.post(BASE_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert("Lead saved successfully!");
        setForm(initialState);
        setErrors({});
      } else {
        alert("Failed to save lead: Unexpected response");
        console.error("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Lead save error:", err.response?.data || err.message);
      alert(
        "Failed to save lead: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const fetchPincodeDetails = async (pincode) => {
    if (pincode.length !== 6) return; // Only allow 6 digit Indian pincode

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const info = data[0].PostOffice[0];

        setForm(prev => ({
          ...prev,
          city: info.District,
          state: info.State,
          country: "India"
        }));

        setErrors(prev => ({ ...prev, pincode: "" }));
      } else {
        setErrors(prev => ({ ...prev, pincode: "Invalid Pincode" }));
      }
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <div>
      <h3>Enter Lead</h3>
      <form className='Lead-Form' onSubmit={handleSubmit}>
        <h4>Core Data</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Business *</label>
            <input name="business" value={form.business} onChange={handleChange} />
            {errors.business && <span className="error">{errors.business}</span>}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input name="designation" value={form.designation} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map((c, index) => (
                <option key={`${c.isoCode}-${index}`} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>

          </div>

          <div className="form-group">
            <label>City</label>
            <input name="city" value={form.city} readOnly />
          </div>

        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <select name="state" value={form.state} onChange={handleChange}>
              <option value="">Select State</option>
              {states.map((s, index) => (
                <option key={`${s.isoCode}-${index}`} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

          </div>

          <div className="form-group">
            <label>Mobile *</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>GSTIN</label>
            <input name="gstin" value={form.gstin} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label>Website</label>
            <input name="website" value={form.website} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Code</label>
            <input name="code" value={form.code} onChange={handleChange} />
          </div>
        </div>

        <h4>Business Opportunity</h4>
        <div className="form-row">
          <select name="source" value={form.source} onChange={handleChange}>
            <option value="">Select Source</option>
            {sourceOptions.map((src, index) => (
              <option key={`${src}-${index}`} value={src}>
                {src}
              </option>
            ))}
          </select>

          {errors.source && <span className="error">{errors.source}</span>}

          <div className="form-group">
            <label>Since</label>
            <input type="date" name="since" value={form.since} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <select name="requirement" value={form.requirement} onChange={handleChange}>
            <option value="">Select Requirement</option>
            {requirementOptions.map((req, index) => (
              <option key={`${req}-${index}`} value={req}>
                {req}
              </option>
            ))}
          </select>

          {errors.requirement && <span className="error">{errors.requirement}</span>}

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categoryOptions.map((cat, index) => (
              <option key={`${cat}-${index}`} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {errors.category && <span className="error">{errors.category}</span>}

        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Notes</label>
            <input name="notes" value={form.notes} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Product</label>
            <input name="product" value={form.product} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Potential</label>
            <input name="potential" value={form.potential} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Assigned To</label>
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={(e) => setForm(prev => ({ ...prev, assignedTo: e.target.value }))}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._links.self.href} value={user._links.self.href}>
                  {user.fullName || user.username || "Unnamed User"}
                </option>
              ))}
            </select>

          </div>
        </div>

        <div className="form-row">
          <select name="stage" value={form.stage} onChange={handleChange}>
            <option value="">Select Stage</option>
            {stageOptions.map((stg, index) => (
              <option key={`${stg}-${index}`} value={stg}>
                {stg}
              </option>
            ))}
          </select>

          <div className="form-group">
            <label>Tags</label>
            <input name="tags" value={form.tags} onChange={handleChange} />
          </div>
        </div>

        <button type="submit">Save & Close</button>
      </form>
    </div>
  );
}

export default LeadForm;
