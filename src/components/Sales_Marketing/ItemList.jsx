import React, { useState } from "react";
import "../CSS/ItemList.css";
import ItemSelectionPage from "./ItemSelectionPage"; // your component with item list

export const ItemList = ({ items, handleArrayChange, addRow, removeRow }) => {
  const [showItemBox, setShowItemBox] = useState(false);

  const handleAddItemClick = () => {
    setShowItemBox(true); // show the inline box
  };

  const handleCloseBox = () => {
    setShowItemBox(false); // hide the box
  };

  return (
    <div>
      <h3>Item List</h3>
      <table className="item-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Item & Description</th>
            <th>HSN/SAC</th>
            <th>QTY</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Discount</th>
            <th>Taxable</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Amount</th>
            <th>Lead Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><input type="text" value={item.imageUrl} onChange={(e) => handleArrayChange(index, "imageUrl", e.target.value, "items")} /></td>
              <td><input value={item.itemDescription} onChange={(e) => handleArrayChange(index, "itemDescription", e.target.value, "items")} /></td>
              <td><input value={item.hsnSac} onChange={(e) => handleArrayChange(index, "hsnSac", e.target.value, "items")} /></td>
              <td><input type="number" value={item.quantity} onChange={(e) => handleArrayChange(index, "quantity", e.target.value, "items")} /></td>
              <td><input value={item.unit} onChange={(e) => handleArrayChange(index, "unit", e.target.value, "items")} /></td>
              <td><input type="number" value={item.rate} onChange={(e) => handleArrayChange(index, "rate", e.target.value, "items")} /></td>
              <td><input type="number" value={item.discount} onChange={(e) => handleArrayChange(index, "discount", e.target.value, "items")} /></td>
              <td><input type="number" value={item.taxable} onChange={(e) => handleArrayChange(index, "taxable", e.target.value, "items")} /></td>
              <td><input type="number" value={item.cgst} onChange={(e) => handleArrayChange(index, "cgst", e.target.value, "items")} /></td>
              <td><input type="number" value={item.sgst} onChange={(e) => handleArrayChange(index, "sgst", e.target.value, "items")} /></td>
              <td><input type="number" value={item.amount} onChange={(e) => handleArrayChange(index, "amount", e.target.value, "items")} /></td>
              <td><input value={item.leadTime} onChange={(e) => handleArrayChange(index, "leadTime", e.target.value, "items")} /></td>
              <td><button type="button" onClick={() => removeRow("items", index)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-item-container">
        <button
          type="button"
          className="add-item-btn"
          onClick={handleAddItemClick}
        >
          + Add Item
        </button>
      </div>

      {/* Inline Box for item selection */}
      {showItemBox && (
        <div className="item-selection-box">
          <button className="close-btn" onClick={handleCloseBox}>X</button>
          <ItemSelectionPage />
        </div>
      )}
    </div>
  );
};

export default ItemList;
