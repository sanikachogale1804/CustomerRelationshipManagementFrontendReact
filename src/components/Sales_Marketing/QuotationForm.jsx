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
    items: [],
    terms: [""],
    notes: "",
    bankDetails: "",
    uploadedFile: "",
    nextActions: {
      saveTemplate: false,
      shareEmail: false,
      shareWhatsapp: false,
      printAfterSaving: false,
      alertOnOpening: false,
    },
    total: "",
    grandTotal: "",
    discounts: [{ description: "", amount: "" }],
    extraCharges: [{ description: "", amount: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextActionsChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      nextActions: { ...formData.nextActions, [name]: checked },
    });
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
      const response = await axios.post("http://localhost:8080/quotations", formData);
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



      {/* Terms & Conditions */}
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

      {/* Notes & Bank Details */}
      <h3>Notes & Bank Details</h3>
      <div className="section-row" style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Bank Details</label>
          <textarea
            name="bankDetails"
            value={formData.bankDetails}
            onChange={handleChange}
            placeholder="Bank Details"
          />
        </div>
      </div>

      {/* Upload File */}
      <h3>Upload File</h3>
      <div className="form-group">
        <input
          type="text"
          name="uploadedFile"
          placeholder="File URL / Path"
          value={formData.uploadedFile}
          onChange={handleChange}
        />
        <button type="button" style={{ marginLeft: "10px" }}>Upload File</button>
      </div>

      {/* Next Actions */}
      <h3>Next Actions</h3>
      <div className="next-actions">
        <label>
          <input
            type="checkbox"
            name="saveTemplate"
            checked={formData.nextActions.saveTemplate}
            onChange={handleNextActionsChange}
          />
          Save as Template
        </label>
        <label>
          <input
            type="checkbox"
            name="shareEmail"
            checked={formData.nextActions.shareEmail}
            onChange={handleNextActionsChange}
          />
          Share by Email
        </label>
        <label>
          <input
            type="checkbox"
            name="shareWhatsapp"
            checked={formData.nextActions.shareWhatsapp}
            onChange={handleNextActionsChange}
          />
          Share by Whatsapp
        </label>
        <label>
          <input
            type="checkbox"
            name="printAfterSaving"
            checked={formData.nextActions.printAfterSaving}
            onChange={handleNextActionsChange}
          />
          Print Document after Saving
        </label>
        <label>
          <input
            type="checkbox"
            name="alertOnOpening"
            checked={formData.nextActions.alertOnOpening}
            onChange={handleNextActionsChange}
          />
          Alert me on Opening
        </label>
      </div>

      {/* Save Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button type="submit" style={{ backgroundColor: "green", color: "white" }}>Save</button>
        <button type="button" style={{ backgroundColor: "green", color: "white" }}>Save & Enter Another</button>
      </div>
    </form>
  );
};
export default QuotationForm;
