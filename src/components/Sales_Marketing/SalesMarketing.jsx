import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Sales.css";
import LeadList from "./LeadList";


export default function SalesMarketing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [visibleHeaders, setVisibleHeaders] = useState({});
  const [showHeaderSelector, setShowHeaderSelector] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importData, setImportData] = useState([]);
  const [importPreview, setImportPreview] = useState([]);
  const [importStatus, setImportStatus] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);
  const headerSelectorRef = useRef(null);
  const importModalRef = useRef(null);
  const tableWrapperRef = useRef(null);

  // All available headers - This will be used for import mapping
  const allHeaders = [
    { id: "leadId", label: "Lead ID", defaultVisible: true, width: "80px" },
    { id: "leadDate", label: "Lead Date", defaultVisible: true, width: "100px" },
    { id: "leadSource", label: "Lead Source", defaultVisible: true, width: "120px" },
    { id: "assignedTo", label: "Assigned To", defaultVisible: true, width: "120px" },
    { id: "projectName", label: "Project Name", defaultVisible: true, width: "150px" },
    { id: "companyWebsite", label: "Company Website", defaultVisible: true, width: "150px" },
    { id: "country", label: "Country", defaultVisible: true, width: "100px" },
    { id: "state", label: "State", defaultVisible: true, width: "100px" },
    { id: "district", label: "District", defaultVisible: true, width: "100px" },
    { id: "city", label: "City", defaultVisible: true, width: "100px" },
    { id: "pincode", label: "PinCode", defaultVisible: true, width: "90px" },
    { id: "fullAddress", label: "Full Address", defaultVisible: true, width: "200px" },
    { id: "gstin", label: "GSTIN", defaultVisible: true, width: "120px" },
    { id: "system", label: "System", defaultVisible: true, width: "100px" },
    { id: "category", label: "Category", defaultVisible: true, width: "100px" },
    { id: "projectValue", label: "Project Value", defaultVisible: true, width: "120px" },
    { id: "marginPercent", label: "Margin %", defaultVisible: true, width: "90px" },
    { id: "marginValue", label: "Margin Value", defaultVisible: true, width: "120px" },
    { id: "negotiatedValue", label: "Negotiated Value", defaultVisible: true, width: "130px" },
    { id: "closingAmount", label: "Closing Amount", defaultVisible: true, width: "120px" },
    { id: "advanceAmount", label: "Advance Amount", defaultVisible: true, width: "120px" },
    { id: "balanceAmount", label: "Balance Amount", defaultVisible: true, width: "120px" },
    { id: "nextFollowDate", label: "Next Follow Date", defaultVisible: true, width: "120px" },
    { id: "contactPersonName", label: "Contact Person Name", defaultVisible: true, width: "150px" },
    { id: "contactPersonNumber", label: "Contact Person Number", defaultVisible: true, width: "140px" },
    { id: "contactPersonEmail", label: "Contact Person Email", defaultVisible: true, width: "180px" },
    { id: "designation", label: "Designation", defaultVisible: true, width: "120px" },
    { id: "meetingDateTime", label: "Meeting Date & Time", defaultVisible: true, width: "160px" },
    { id: "purposeOfMeeting", label: "Purpose Of Meeting", defaultVisible: true, width: "150px" },
    { id: "meetingOutcome", label: "Meeting Outcome", defaultVisible: true, width: "140px" },
    { id: "discussionHeld", label: "Discussion Held", defaultVisible: true, width: "150px" },
    { id: "currentStatus", label: "Current Status", defaultVisible: true, width: "120px" },
    { id: "prospect", label: "Prospect", defaultVisible: true, width: "100px" },
    { id: "remarks", label: "Remarks", defaultVisible: true, width: "150px" },
    { id: "stage", label: "Stage", defaultVisible: true, width: "100px" }
  ];

  // Initialize visible headers
  useEffect(() => {
    const initialVisibleHeaders = {};
    allHeaders.forEach(header => {
      initialVisibleHeaders[header.id] = header.defaultVisible;
    });
    setVisibleHeaders(initialVisibleHeaders);
  }, []);

  // Handle click outside modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close header selector
      if (headerSelectorRef.current && !headerSelectorRef.current.contains(event.target)) {
        setShowHeaderSelector(false);
      }

      // Close import modal
      if (importModalRef.current && !importModalRef.current.contains(event.target) && !event.target.closest('.import-lead-btn')) {
        setShowImportModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleHeaderVisibility = (headerId) => {
    setVisibleHeaders(prev => ({
      ...prev,
      [headerId]: !prev[headerId]
    }));
  };

  const selectAllHeaders = () => {
    const allVisible = {};
    allHeaders.forEach(header => {
      allVisible[header.id] = true;
    });
    setVisibleHeaders(allVisible);
  };

  const deselectAllHeaders = () => {
    const noneVisible = {};
    allHeaders.forEach(header => {
      noneVisible[header.id] = false;
    });
    setVisibleHeaders(noneVisible);
  };

  const resetToDefault = () => {
    const defaultVisible = {};
    allHeaders.forEach(header => {
      defaultVisible[header.id] = header.defaultVisible;
    });
    setVisibleHeaders(defaultVisible);
  };

  // Handle file selection for import
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validExtensions = ['.csv'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setImportStatus("error: Please select a CSV file (.csv)");
      return;
    }

    setImportFile(file);
    setImportStatus("processing: Reading file...");
    setIsImporting(true);

    // Read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        parseCSV(data);
      } catch (error) {
        setImportStatus("error: Failed to read file. Please check the format.");
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      setImportStatus("error: Failed to read file.");
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  // Parse CSV file
  const parseCSV = (csvData) => {
    try {
      const rows = csvData.split('\n');
      if (rows.length < 2) {
        setImportStatus("error: CSV file is empty or has only headers");
        setIsImporting(false);
        return;
      }

      const headers = rows[0].split(',').map(h => h.trim());

      // Validate headers
      const requiredHeaders = allHeaders.map(h => h.label);
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

      if (missingHeaders.length > 0) {
        setImportStatus(`warning: Some columns missing: ${missingHeaders.join(', ')}. You can still proceed.`);
      } else {
        setImportStatus("success: All columns found!");
      }

      // Parse data rows
      const data = [];
      for (let i = 1; i < Math.min(rows.length, 6); i++) { // Preview first 5 rows
        if (rows[i].trim()) {
          const values = rows[i].split(',');
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index] ? values[index].trim() : '';
          });
          data.push(rowData);
        }
      }

      setImportPreview(data);
      setImportData(rows.slice(1).filter(row => row.trim()).length);
      setIsImporting(false);
    } catch (error) {
      setImportStatus("error: Failed to parse CSV file. Please check the format.");
      setIsImporting(false);
    }
  };

  // Download template
  const downloadTemplate = () => {
    // Create template data with headers
    const templateHeaders = allHeaders.map(h => h.label);
    const templateRow = allHeaders.map(h => `Sample ${h.label}`);

    // Create CSV content
    const csvContent = [
      templateHeaders.join(','),
      templateRow.join(',')
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle import confirmation
  const handleImportConfirm = async () => {
    if (!importFile) return;

    setIsImporting(true);
    setImportStatus("processing: Importing leads to database...");

    // Simulate API call
    setTimeout(() => {
      // Here you would make actual API call to your backend
      // For example: await axios.post('/api/leads/import', importData);

      setIsImporting(false); // FIXED: Removed extra 't'
      setImportStatus("success: Successfully imported " + importData + " leads!");

      // Clear after successful import
      setTimeout(() => {
        setShowImportModal(false);
        setImportFile(null);
        setImportData([]);
        setImportPreview([]);
        setImportStatus("");

        // Here you would refresh the table data
        // fetchLeads();
      }, 2000);
    }, 2000);
  };

  // Reset import
  const resetImport = () => {
    setImportFile(null);
    setImportData([]);
    setImportPreview([]);
    setImportStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="sales-container">
      {/* Import Leads Modal */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="import-modal" ref={importModalRef}>
            <div className="modal-header">
              <h3>Import Leads</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowImportModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="import-instructions">
                <h4>Instructions:</h4>
                <ul>
                  <li>Upload CSV (.csv) file only</li>
                  <li>File must include these columns: {allHeaders.slice(0, 5).map(h => h.label).join(', ')}...</li>
                  <li>First row should contain column headers</li>
                  <li>Download template for correct format</li>
                </ul>

                <div className="template-download">
                  <button className="template-btn" onClick={downloadTemplate}>
                    📥 Download Template
                  </button>
                </div>
              </div>

              <div className="file-upload-area">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".csv"
                  style={{ display: 'none' }}
                />

                {!importFile ? (
                  <div
                    className="upload-dropzone"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="upload-icon">📁</div>
                    <h4>Click to select file or drag & drop</h4>
                    <p>Supports: .csv only</p>
                    <button className="upload-btn">
                      Choose File
                    </button>
                  </div>
                ) : (
                  <div className="file-preview">
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      <div className="file-details">
                        <h4>{importFile.name}</h4>
                        <p>{(importFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button className="remove-file-btn" onClick={resetImport}>
                        ×
                      </button>
                    </div>

                    {importStatus && (
                      <div className={`import-status ${importStatus.split(':')[0]}`}>
                        {importStatus.split(':')[1]}
                      </div>
                    )}

                    {importPreview.length > 0 && (
                      <div className="data-preview">
                        <h5>Preview (First {importPreview.length} rows):</h5>
                        <div className="preview-table-container">
                          <table className="preview-table">
                            <thead>
                              <tr>
                                {Object.keys(importPreview[0]).slice(0, 5).map(header => (
                                  <th key={header}>{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {importPreview.map((row, index) => (
                                <tr key={index}>
                                  {Object.values(row).slice(0, 5).map((value, idx) => (
                                    <td key={idx}>{value || '-'}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="preview-note">Showing first 5 columns of {importPreview.length} rows</p>
                      </div>
                    )}

                    {importData > 0 && (
                      <div className="import-summary">
                        <p><strong>Total rows to import:</strong> {importData}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowImportModal(false)}
                disabled={isImporting}
              >
                Cancel
              </button>
              <button
                className="import-confirm-btn"
                onClick={handleImportConfirm}
                disabled={!importFile || isImporting}
              >
                {isImporting ? 'Importing...' : `Import ${importData} Leads`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sales Top Bar */}
      <div className="sales-top-bar">
        <div className="top-left">
          <button className="back-btn" onClick={() => navigate("/admin")}>
            🔙 Back to Dashboard
          </button>
        </div>

        <div className="top-right">
          <button
            className="action-btn"
            onClick={() => navigate("/leadform")}
          >
            Add Lead
          </button>

          <button
            className="action-btn import-lead-btn"
            onClick={() => setShowImportModal(true)}
          >
            Import Lead
          </button>

          <button
            className={`main-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`main-btn ${activeTab === "datatable" ? "active" : ""}`}
            onClick={() => setActiveTab("datatable")}
          >
            Data Table
          </button>

          {/* Three-dot menu for Header Selector - Only shown in Data Table view */}
          {activeTab === "datatable" && (
            <div className="header-selector-wrapper" ref={headerSelectorRef}>
              <button
                className="three-dot-menu"
                onClick={() => setShowHeaderSelector(!showHeaderSelector)}
                title="Select Columns"
              >
                <span>⋯</span>
              </button>

              {showHeaderSelector && (
                <div className="header-selector-dropdown">
                  <div className="header-selector-header">
                    <h4>Select Columns</h4>
                    <div className="header-selector-actions">
                      <button onClick={selectAllHeaders} className="selector-action-btn">All</button>
                      <button onClick={deselectAllHeaders} className="selector-action-btn">None</button>
                      <button onClick={resetToDefault} className="selector-action-btn">Default</button>
                    </div>
                  </div>
                  <div className="header-selector-list">
                    {allHeaders.map(header => (
                      <div key={header.id} className="header-checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={visibleHeaders[header.id] || false}
                            onChange={() => toggleHeaderVisibility(header.id)}
                          />
                          <span className="checkbox-label">{header.label}</span>
                          <span className="column-preview">
                            {visibleHeaders[header.id] ? "👁️" : "👁️‍🗨️"}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="header-selector-footer">
                    <span className="selected-count">
                      {Object.values(visibleHeaders).filter(v => v).length} selected
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="department-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            <h2>Sales & Marketing KPIs</h2>
            <div className="kpi-cards">
              {/* Add dynamic KPI data here */}
            </div>
            <div className="charts">
              {/* Add chart components here */}
            </div>
          </div>
        )}

        {<div className="department-content">
          {activeTab === "dashboard" && (
            <div className="dashboard-view">
              <h2>Sales & Marketing KPIs</h2>
            </div>
          )}

          {activeTab === "datatable" && (
            <LeadList />
          )}
        </div>
        }
      </div>
    </div>
  );
}