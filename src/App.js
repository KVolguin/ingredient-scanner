import FileList from './FileList';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [result, setResult] = useState(""); // Store OCR result
  const [loading, setLoading] = useState(false); // Show loading state

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // Show loading spinner

    /* eslint-disable */
    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.extracted_text); // Display the OCR result
      setMessage("File uploaded successfully!");
      setMessageType("success");

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error uploading file!");
      setMessageType("error");
    } finally {
      setLoading(false); // Hide loading spinner
    }
    /* eslint-enable */
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ingredient Scanner</h1>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {loading && <p>Processing...</p>}
      {result && (
        <div>
          <h2>OCR Result:</h2>
          <p>{result}</p>
        </div>
      )}

      {/* Render FileList component here */}
      <FileList />

      {message && (
        <div
          style={{
            color: messageType === "success" ? "green" : "red",
            margin: "10px 0",
          }}
        >
          {message}
        </div>
      )}

    </div>
    
  );
}

export default App;
