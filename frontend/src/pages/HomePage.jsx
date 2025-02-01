import React, { useState } from "react";
import Summary from "./Summary.jsx"; // Import the Summary component
import LongVideo from "./LongVideo";
import ShortVideo from "./ShortVideo.jsx";
import PPTViewer from "./PPTViewer.jsx";

function HomePage() {
  const [file, setFile] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null); // Track the active component

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleComponentChange = (component) => {
    if (file) {
      setActiveComponent(component); // Set the active component
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "#1E3A8A" }}>
      {/* Header */}
      <header style={{ height:"22px", width:"1340px" , backgroundColor: "#2563EB", color: "white", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 4px rgba(14, 13, 13, 0.1)" }}>
        <img src="/logo.png" alt="Company Logo" style={{ height: "40px", width: "40px" }} />
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Company Name</h1>
      </header>

      {/* Main Content */}
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Upload Your File</h2>

        {/* File Upload Input */}
        <div style={styles.container}>
          <div style={styles.header}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "100px" }}>
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Browse File to upload!</p>
          </div>
          <label htmlFor="file" style={styles.footer}>
            <p>{file ? file.name : "Not selected file"}</p>
            <input id="file" type="file" style={{ display: "none" }} onChange={handleFileChange} />
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px" , marginTop:"10px" }}>
          <button 
            style={{ padding: "8px 16px", borderRadius: "8px", boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)", backgroundColor: file ? "#2563EB" : "#D3D3D3", color: file ? "white" : "#4B5563", cursor: file ? "pointer" : "not-allowed" }}
            disabled={!file} 
            onClick={() => handleComponentChange("Summary")} // Set active component
          >
            Summary
          </button>
          <button 
            style={{ padding: "8px 16px", borderRadius: "8px", boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)", backgroundColor: file ? "#2563EB" : "#D3D3D3", color: file ? "white" : "#4B5563", cursor: file ? "pointer" : "not-allowed" }}
            disabled={!file} 
            onClick={() => handleComponentChange("ShortVideo")} // Set active component
          >
            Short Video
          </button>
          <button 
            style={{ padding: "8px 16px", borderRadius: "8px", boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)", backgroundColor: file ? "#2563EB" : "#D3D3D3", color: file ? "white" : "#4B5563", cursor: file ? "pointer" : "not-allowed" }}
            disabled={!file} 
            onClick={() => handleComponentChange("LongVideo")} // Set active component
          >
            Long Video
          </button>
          <button 
            style={{ padding: "8px 16px", borderRadius: "8px", boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)", backgroundColor: file ? "#2563EB" : "#D3D3D3", color: file ? "white" : "#4B5563", cursor: file ? "pointer" : "not-allowed" }}
            disabled={!file} 
            onClick={() => handleComponentChange("PPTViewer")} // Set active component
          >
            PPT generator
          </button>
        </div>
      </main>

      {/* Render active component */}
      <div style={{ marginTop: "40px", width: "100%" }}>
        {activeComponent === "Summary" && <Summary file={file} />}
        {activeComponent === "LongVideo" && <LongVideo file={file} />}
        {activeComponent === "ShortVideo" && <ShortVideo file={file} />}
        {activeComponent === "PPTViewer" && <PPTViewer file={file} />}
        {/* Render other components like ShortVideo or LongVideo based on activeComponent */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "240px",
    width: "240px",
    borderRadius: "8px",
    boxShadow: "3px 3px 20px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px",
    gap: "4px",
    backgroundColor: "rgba(0, 110, 255, 0.041)",
  },
  header: {
    flex: 1,
    width: "100%",
    border: "1.5px dashed royalblue",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "5px",
  },
  footer: {
    backgroundColor: "rgba(0, 110, 255, 0.075)",
    width: "100%",
    height: "32px",
    padding: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    border: "none",
    textAlign: "center",
    fontSize: "13px",
  },
};

export default HomePage;
