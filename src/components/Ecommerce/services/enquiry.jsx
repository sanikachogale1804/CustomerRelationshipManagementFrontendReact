// src/Components/Ecommerce/services/enquiry.js
export async function createEnquiry(data) {
  console.log("Enquiry submitted:", data);
  return Promise.resolve({ success: true });
}
