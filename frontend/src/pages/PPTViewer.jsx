import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const PPTViewer = ({ file }) => {
  const [pptUrl, setPptUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const generatePresentation = async () => {
    try {
      setIsLoading(true);
      // Call the API to generate the presentation with the file path
      const response = await axios.post('http://127.0.0.1:5000/generate-presentation', {
        file_path: file, // Use the file path passed as a prop
      });

      console.log(response);
      // Set pptUrl from API response
      setPptUrl(response.data.pptUrl);
    } catch (err) {
      console.error('Error fetching PPT:', err);
      // Log the detailed error response from the server
      if (err.response) {
        console.error("Server responded with:", err.response.data);
        setError(`Failed to load PPT: ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError('No response from the server. Please check your connection.');
      } else {
        console.error("Error setting up the request:", err.message);
        setError('Failed to load PPT. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Ensure loading state is updated here only after processing
    }
  };

  useEffect(() => {
    if (file) {
      generatePresentation();
    }
  }, [file]);

  return (
    <div style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#2563EB' }}>PowerPoint Presentation Generator</h1>
      
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Loader />
          <p style={{ fontSize: "12px" }}>Generating presentation, please wait...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>
          <p>{error}</p>
        </div>
      ) : (
        pptUrl && (
          <div style={{ textAlign: 'center' }}>
            <p>Your PowerPoint presentation has been generated successfully!</p>
            <p>
              <a href={pptUrl} target="_blank" rel="noopener noreferrer">
                <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '5px' }}>
                  Download Presentation
                </button>
              </a>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PPTViewer;