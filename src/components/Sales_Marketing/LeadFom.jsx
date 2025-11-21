import React, { useState } from 'react';
import { BASE_URL } from '../services/leadService';
import axios from 'axios';
import '../CSS/LeadForm.css';
import {Country,State} from 'country-state-city';

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
      const res = await axios.post(BASE_URL, form);
      if (res.status === 200 || res.status === 201) {
        alert("Lead saved successfully!");
        setForm(initialState);
        setErrors({});
      } else {
        alert("Failed to save lead");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save lead");
    }
  }

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
              {countries.map(c => (
                <option key={c.isoCode} value={c.isoCode}>
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
              {states.map(s => (
                <option key={s.isoCode} value={s.name}>
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
          <div className="form-group">
            <label>Source *</label>
            <input name="source" value={form.source} onChange={handleChange} />
            {errors.source && <span className="error">{errors.source}</span>}
          </div>

          <div className="form-group">
            <label>Since</label>
            <input name="since" value={form.since} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Requirement *</label>
            <input name="requirement" value={form.requirement} onChange={handleChange} />
            {errors.requirement && <span className="error">{errors.requirement}</span>}
          </div>
          <div className="form-group">
            <label>Category *</label>
            <input name="category" value={form.category} onChange={handleChange} />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
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
            <input name="assignedTo" value={form.assignedTo} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stage</label>
            <input name="stage" value={form.stage} onChange={handleChange} />
          </div>
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
