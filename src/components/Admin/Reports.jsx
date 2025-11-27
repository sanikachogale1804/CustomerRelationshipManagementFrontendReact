import React from "react";
import '../CSS/Reports.css'

export default function Reports() {
  const reportList = [
    { name: "Daily Customer Report", file: "/reports/daily-report.pdf" },
    { name: "Monthly Sales Report", file: "/reports/monthly-sales.pdf" },
    { name: "QC Inspection Report", file: "/reports/qc-report.pdf" },
    { name: "Lead Summary Report", file: "/reports/lead-summary.pdf" },
  ];

  return (
    <div className="page-box">
      <h2 className="page-title">📄 Available Reports</h2>

      <ul className="report-list">
        {reportList.map((r, i) => (
          <li key={i} className="report-item">
            <span>{r.name}</span>

            <a href={r.file} download className="download-btn">
              ⬇ Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}