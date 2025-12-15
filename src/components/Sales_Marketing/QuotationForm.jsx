import React, { useState } from "react";
import axios from "axios";
import "../CSS/QuotationForm.css";
import ItemList from "./ItemList";

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    branch: "",
    copyFrom: "",
    contactPerson: "",
    address: "",
    shippingAddress: "",
    salesCredit: "",
    quotationNumber: "",
    reference: "",
    quotationDate: "",
    validTill: "",
    terms: [""],
    notes: "",
    bankDetails: "",
    extraCharges: [{ description: "", amount: "" }],
    discounts: [{ description: "", amount: "" }],
    total: "",
    grandTotal: "",
    uploadedFile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, field, value, key) => {
    const updated = [...formData[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const addRow = (key, emptyRow) => {
    setFormData({ ...formData, [key]: [...formData[key], emptyRow] });
  };

  const removeRow = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData({ ...formData, [key]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/quotation", formData);
      alert("Quotation Saved Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save quotation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quotation-form">
      <h2>Create Quotation</h2>

      {/* Customer Info */}
      <h3>Basic Information</h3>
      <div className="section-row">
        <div className="form-group">
          <input name="customer" placeholder="Customer" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="branch" placeholder="Branch" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="copyFrom" placeholder="Copy From (Optional)" onChange={handleChange} />
        </div>
      </div>

      {/* Party Details */}
      <h3>Party Details</h3>
      <div className="section-row">
        <div className="form-group">
          <input name="contactPerson" placeholder="Contact Person" onChange={handleChange} />
        </div>
        <div className="form-group">
          <textarea name="address" placeholder="Address" onChange={handleChange} />
        </div>
        <div className="form-group">
          <textarea name="shippingAddress" placeholder="Shipping Address" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="salesCredit" placeholder="Sales Credit" onChange={handleChange} />
        </div>
      </div>

      {/* Document Details */}
      <h3>Document Details</h3>
      <div className="section-row">
        <div className="form-group">
          <input name="quotationNumber" placeholder="Quotation Number" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="reference" placeholder="Reference" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Quotation Date</label>
          <input type="date" name="quotationDate" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Valid Till</label>
          <input type="date" name="validTill" onChange={handleChange} />
        </div>
      </div>

      <ItemList
        items={formData.items || []}
        handleArrayChange={handleArrayChange}
        addRow={addRow}
        removeRow={removeRow}
      />


      {/* Terms */}
      <h3>Terms & Conditions</h3>
      <div className="dynamic-list">
        {formData.terms.map((t, i) => (
          <div key={i}>
            <input
              value={t}
              onChange={(e) => {
                const updated = [...formData.terms];
                updated[i] = e.target.value;
                setFormData({ ...formData, terms: updated });
              }}
              placeholder="Term"
            />
            <button type="button" onClick={() => removeRow("terms", i)}>X</button>
          </div>
        ))}
        <button type="button" onClick={() => addRow("terms", "")}>+ Add Term</button>
      </div>


      {/* Discounts */}
      <h3>Discounts</h3>
      <div className="dynamic-list">
        {formData.discounts.map((item, i) => (
          <div key={i}>
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleArrayChange(i, "description", e.target.value, "discounts")}
            />
            <input
              placeholder="Amount"
              value={item.amount}
              onChange={(e) => handleArrayChange(i, "amount", e.target.value, "discounts")}
            />
            <button type="button" onClick={() => removeRow("discounts", i)}>X</button>
          </div>
        ))}
        <button type="button" onClick={() => addRow("discounts", { description: "", amount: "" })}>
          + Add Discount
        </button>
      </div>

      {/* Totals */}
      <h3>Total Calculation</h3>
      <div className="section-row">
        <div className="form-group">
          <input name="total" placeholder="Total" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="grandTotal" placeholder="Grand Total" onChange={handleChange} />
        </div>
      </div>

      {/* File Upload */}
      <h3>Upload File</h3>
      <div className="form-group">
        <input type="text" name="uploadedFile" placeholder="File URL / Path" onChange={handleChange} />
      </div>

      <button type="submit">Save Quotation</button>
    </form>
  );
};

export default QuotationForm;
