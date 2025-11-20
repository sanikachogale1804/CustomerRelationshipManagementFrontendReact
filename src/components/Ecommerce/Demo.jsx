// src/Components/Ecommerce/Demo1.jsx
import { useEffect, useState } from "react";
import { createEnquiry } from "./services/enquiry";
import { Toast } from "./Toast";

export default function Demo1() {
  const brands = ["CP Plus", "Hikvision", "Dahua", "HKC", "Eurosat"];
  const allProducts = [
    {
      id: 1,
      name: "CP Plus 2.4 MP IR Bullet Camera",
      brand: "CP Plus",
      price: 1850,
      mp: "2.4 MP",
      type: "Bullet Camera",
      offers: ["2 Years Warranty", "60m IR Distance"],
      img: "https://via.placeholder.com/300x200?text=CP+Plus",
    },
    {
      id: 2,
      name: "Hikvision 2 MP Dome Camera",
      brand: "Hikvision",
      price: 1750,
      mp: "2 MP",
      type: "Dome Camera",
      offers: ["Night Vision", "High Resolution"],
      img: "https://via.placeholder.com/300x200?text=Hikvision",
    },
    {
      id: 3,
      name: "Dahua 4 MP ColorVu Camera",
      brand: "Dahua",
      price: 2600,
      mp: "4 MP",
      type: "Color Camera",
      offers: ["Full Color", "Wide Angle"],
      img: "https://via.placeholder.com/300x200?text=Dahua",
    },
    {
      id: 4,
      name: "HKC Outdoor Camera",
      brand: "HKC",
      price: 1450,
      mp: "2 MP",
      type: "Outdoor Camera",
      offers: ["Waterproof", "IR Night Vision"],
      img: "https://via.placeholder.com/300x200?text=HKC",
    },
    {
      id: 5,
      name: "Eurosat HD Camera",
      brand: "Eurosat",
      price: 1650,
      mp: "2 MP",
      type: "HD Camera",
      offers: ["Metal Body", "Clear Recording"],
      img: "https://via.placeholder.com/300x200?text=Eurosat",
    },
  ];

  const [query, setQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [enquiry, setEnquiry] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (brandFilter ? p.brand === brandFilter : true)
  );

  const addToEnquiry = (product) => {
    setEnquiry((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) return prev.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { ...product, qty: 1 }];
    });
    setToast({ show: true, message: "Added to enquiry!" });
  };

  const removeFromEnquiry = (id) => setEnquiry((prev) => prev.filter((x) => x.id !== id));

  const submitEnquiry = async () => {
    if (enquiry.length === 0) {
      setToast({ show: true, message: "No items in enquiry!" });
      return;
    }

    const enquiryText = enquiry
      .map((item) => `${item.name} - Qty: ${item.qty} - Price: ₹${item.price}`)
      .join("\n");

    await createEnquiry({ enquiry: enquiryText, date: new Date() });

    setToast({ show: true, message: "Enquiry sent successfully!" });
    setEnquiry([]);
  };

  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast({ show: false, message: "" }), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50 p-4 flex justify-between items-center">
        <img
          src="https://via.placeholder.com/150x50?text=Logo"
          alt="logo"
          className="h-12"
        />
        <a
          href={`https://wa.me/919820000000?text=${encodeURIComponent(
            "Hello Wardha Solutions, I want to know more about CCTV products."
          )}`}
          className="px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          WhatsApp
        </a>
      </header>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-2xl font-bold">Products</h3>
          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product..."
              className="px-3 py-2 rounded border"
            />
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-3 py-2 rounded border"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white shadow rounded p-4">
              <img src={p.img} alt={p.name} className="h-40 w-full object-cover rounded" />
              <h4 className="mt-3 font-bold text-lg">{p.name}</h4>
              <p className="text-gray-700">{p.mp} • {p.type}</p>
              <p className="font-semibold mt-2 text-green-700">₹{p.price}</p>

              <button
                onClick={() => addToEnquiry(p)}
                className="mt-3 w-full py-2 bg-blue-600 text-white rounded"
              >
                Add to Enquiry
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry Cart */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl p-4 border-t">
        <h3 className="text-xl font-bold">Enquiry Cart ({enquiry.length})</h3>

        {enquiry.map((item) => (
          <div key={item.id} className="flex justify-between mt-2 bg-gray-100 p-2 rounded">
            <span>{item.name} (Qty: {item.qty})</span>
            <button onClick={() => removeFromEnquiry(item.id)} className="text-red-600">
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={submitEnquiry}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded"
        >
          Submit Enquiry
        </button>
      </div>

      {toast.show && <Toast message={toast.message} />}
    </div>
  );
}
