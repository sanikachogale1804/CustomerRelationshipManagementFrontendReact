import React, { useState } from "react";
import axios from "axios";

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

  // Handle Simple Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Dynamic Arrays
  const handleArrayChange = (index, field, value, key) => {
    const updated = [...formData[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  // Add / Remove Rows
  const addRow = (key, emptyRow) => {
    setFormData({ ...formData, [key]: [...formData[key], emptyRow] });
  };

  const removeRow = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData({ ...formData, [key]: updated });
  };

  // Submit
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

      <h2>Quotation Form</h2>

      {/* Basic Information */}
      <h3>Customer Information</h3>
      <input name="customer" placeholder="Customer" onChange={handleChange} />
      <input name="branch" placeholder="Branch" onChange={handleChange} />
      <input name="copyFrom" placeholder="Copy From (Optional)" onChange={handleChange} />

      {/* Party Details */}
      <h3>Party Details</h3>
      <input name="contactPerson" placeholder="Contact Person" onChange={handleChange} />
      <textarea name="address" placeholder="Address" onChange={handleChange} />
      <textarea name="shippingAddress" placeholder="Shipping Address" onChange={handleChange} />
      <input name="salesCredit" placeholder="Sales Credit" onChange={handleChange} />

      {/* Document Details */}
      <h3>Document Details</h3>
      <input name="quotationNumber" placeholder="Quotation Number" onChange={handleChange} />
      <input name="reference" placeholder="Reference" onChange={handleChange} />

      <label>Quotation Date</label>
      <input type="date" name="quotationDate" onChange={handleChange} />

      <label>Valid Till</label>
      <input type="date" name="validTill" onChange={handleChange} />

      {/* Terms */}
      <h3>Terms & Conditions</h3>
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

      {/* Extra Charges */}
      <h3>Extra Charges</h3>
      {formData.extraCharges.map((item, i) => (
        <div key={i}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleArrayChange(i, "description", e.target.value, "extraCharges")}
          />
          <input
            placeholder="Amount"
            value={item.amount}
            onChange={(e) => handleArrayChange(i, "amount", e.target.value, "extraCharges")}
          />
          <button type="button" onClick={() => removeRow("extraCharges", i)}>X</button>
        </div>
      ))}
      <button type="button" onClick={() => addRow("extraCharges", { description: "", amount: "" })}>
        + Add Charge
      </button>

      {/* Discounts */}
      <h3>Discounts</h3>
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

      {/* Totals */}
      <h3>Total Calculation</h3>
      <input name="total" placeholder="Total" onChange={handleChange} />
      <input name="grandTotal" placeholder="Grand Total" onChange={handleChange} />

      {/* File Upload */}
      <h3>Upload File</h3>
      <input type="text" name="uploadedFile" placeholder="File URL / Path" onChange={handleChange} />

      <button type="submit">Save Quotation</button>
    </form>
  );
};

export default QuotationForm;
