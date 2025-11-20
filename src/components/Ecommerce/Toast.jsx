// src/Components/Ecommerce/Toast.jsx
export function Toast({ message }) {
  return (
    <div className="fixed bottom-24 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
