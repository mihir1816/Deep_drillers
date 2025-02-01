import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios"; // Import Axios for API calls

function LongAudio() {
  const [audioUrl, setAudioUrl] = useState(null); // State to store the generated audio URL
  const [isLoading, setIsLoading] = useState(false); // Loading state to show a spinner
  const [summary, setSummary] = useState("This is the summarized text for the audio..."); // Example summary text

  // Function to fetch audio from an API
  const fetchAudio = async () => {
    setIsLoading(true);
    console.log("Fetching audio...");
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/run_notebook"); // Replace with your actual API endpoint
      setAudioUrl(response.data); // Assuming the API returns an object with an `audioUrl` property
      console.log("Audio fetched: ", response.data);
    } catch (error) {
      console.error("Error fetching audio: ", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchAudio(); // Fetch audio when the component mounts
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7", padding: "20px" }}>
      {/* Exciting Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2563EB" }}>
          Full Research Insights — In-Depth Audio
        </h1>
        <p style={{ fontSize: "18px", color: "#4B5563", marginBottom: "10px" }}>
          Dive into the full explanation of the research paper, covering all the key points in detail.
        </p>
        <div style={{ fontSize: "18px", fontWeight: "500", color: "#2563EB", marginBottom: "20px" }}>
          <p><strong>Unlock in-depth knowledge!</strong> Listen to the full audio below for a detailed explanation of the research paper.</p>
        </div>
      </div>

      {/* Audio Section */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "70%",
            maxWidth: "800px",
            backgroundColor: "#000",
            borderRadius: "15px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: '20px'
          }}
        >
          {/* Show loading spinner while audio is being fetched */}
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              <Loader />
              <p style={{ fontSize: "16px" }}>
                Audio fetching may take some time, please wait...
              </p>
            </div>
          ) : (
            <audio controls style={{ width: '100%' }}>
              {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563EB",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => alert("Audio downloaded")} // Replace with actual download functionality
        >
          Download Full Audio
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#F3F4F6",
            color: "#4B5563",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => alert("Back to Home")} // Replace with actual navigation functionality
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default LongAudio;
