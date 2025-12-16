import React, { useState } from "react";
import axios from "axios";
import "../CSS/AddStockItemForm.css"; // separate CSS for this form

const AddStockItemForm = () => {
  const [form, setForm] = useState({
    itemName: "",
    code: "",
    category: "",
    subCategory: "",
    quantity: "",
    unit: "",
    store: "",
    importance: "",
    stdCost: "",
    purchaseCost: "",
    stdSalesPrice: "",
    hsnSac: "",
    gst: "",
    description: "",
    internalNotes: "",
    minStock: "",
    leadTime: "",
    tags: ""
  });

  const [message, setMessage] = useState(""); // <-- new state for feedback

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset previous messages
    try {
      const response = await axios.post("http://localhost:8080/items", form);
      setMessage("Stock Item Added Successfully");
      console.log(response.data);
      setForm({
        itemName: "",
        code: "",
        category: "",
        subCategory: "",
        quantity: "",
        unit: "",
        store: "",
        importance: "",
        stdCost: "",
        purchaseCost: "",
        stdSalesPrice: "",
        hsnSac: "",
        gst: "",
        description: "",
        internalNotes: "",
        minStock: "",
        leadTime: "",
        tags: ""
      }); // clear form
    } catch (err) {
      console.error(err);
      setMessage("Failed to save stock item"); // controlled message
    }
  };

  return (
    <div className="add-stock-item-form">
      <h2>Add Stock Item</h2>

      {message && <div className="form-message">{message}</div>} {/* <-- message popup */}

      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <div className="section-row">
          <div className="form-group">
            <input name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="code" placeholder="Item Code" value={form.code} onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="category" placeholder="Category" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="subCategory" placeholder="Sub Category" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="quantity" type="number" placeholder="Qty" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="unit" placeholder="Unit" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="store" placeholder="Store" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="importance" placeholder="Importance" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="stdCost" placeholder="Standard Cost" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="purchaseCost" placeholder="Purchase Cost" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="stdSalesPrice" placeholder="Std Sales Price" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="hsnSac" placeholder="HSN / SAC" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="gst" placeholder="GST %" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="minStock" placeholder="Min Stock" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <input name="leadTime" placeholder="Lead Time (days)" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
          </div>
        </div>

        <div className="section-row">
          <div className="form-group">
            <textarea name="description" placeholder="Description" onChange={handleChange} />
          </div>
          <div className="form-group">
            <textarea name="internalNotes" placeholder="Internal Notes" onChange={handleChange} />
          </div>
        </div>

        <button type="submit">Save Stock Item</button>
      </form>
    </div>
  );
};

export default AddStockItemForm;
