import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader"; // Assuming you have a Loader component
import * as mammoth from "mammoth"; // Install using: npm install mammoth

function Summary({ file }) {
  const { state } = useLocation();
  const [fileUrl, setFileUrl] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const [docxContent, setDocxContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [initialSummary, setInitialSummary] = useState("This is a basic summary of the document.");
  const [generatedSummary, setGeneratedSummary] = useState("");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file); // Convert file to URL
      setFileUrl(url);

      if (file.type === "application/pdf") {
        setIsPDF(true);
      } else if (file.name.endsWith(".docx")) {
        setIsPDF(false);
        extractTextFromDocx(file);
      }

      // Simulate AI summary generation
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedSummary("This is the AI-generated summary with detailed insights from the document.");
        setIsGenerating(false);
      }, 5000);

      return () => URL.revokeObjectURL(url); // Cleanup memory when component unmounts
    }
  }, [file]);

  // Function to extract text from DOCX file
  const extractTextFromDocx = (docxFile) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(docxFile);
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setDocxContent(value);
      } catch (error) {
        console.error("Error extracting DOCX text:", error);
      }
    };
  };

  return (
    <div style={styles.container}>
      {/* Left Panel: Original Document */}
      <div style={styles.leftPanel}>
        <h2>Original Document</h2>
        {fileUrl ? (
          isPDF ? (
            <iframe src={fileUrl} title="PDF Document" style={styles.iframe}></iframe>
          ) : (
            <div style={styles.docxContent}>
              {docxContent ? <p>{docxContent}</p> : <p>Loading document...</p>}
            </div>
          )
        ) : (
          <p>No document available</p>
        )}
      </div>

      {/* Right Panel: Summary Output */}
      <div style={styles.rightPanel}>
        <h2>Generated Summary</h2>
        <p>{initialSummary}</p>

        <div style={styles.generatedSummaryContainer}>
          {isGenerating ? (
            <div style={styles.loaderWrapper}>
              <Loader />
              <p>Generating summary...</p>
            </div>
          ) : (
            <p>{generatedSummary}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f7f7f7",
  },
  leftPanel: {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    overflow: "auto",
  },
  rightPanel: {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  generatedSummaryContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100px",
  },
  loaderWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  iframe: {
    width: "100%",
    height: "90%",
    border: "none",
    borderRadius: "8px",
  },
  docxContent: {
    padding: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
};

export default Summary;
