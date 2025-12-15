import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemSelectionPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/items")
      .then((res) => {
        // If Spring Data REST HAL format
        if (res.data._embedded && res.data._embedded.items) {
          setItems(res.data._embedded.items);
        } else if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Button click handlers
  const handleAddStockItem = () => {
    console.log("Add Stock Item clicked");
    // Implement your logic here
  };

  const handleAddServiceItem = () => {
    console.log("Add Service / Non-stock Item clicked");
    // Implement your logic here
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select an Item</h2>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            {item.itemName}
          </li>
        ))}
      </ul>

      {/* Buttons below the list */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={handleAddStockItem}>Add Stock Item</button>
        <button onClick={handleAddServiceItem}>Add Service / Non-stock Item</button>
      </div>
    </div>
  );
};

export default ItemSelectionPage;
