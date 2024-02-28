import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileContainer } from "./links/FileContainer";
import Manual from "./links/Manual"; 
//import Citations from "./Citations";
import "./Home.css";

function Home() {
  const [showCitations, setShowCitations] = useState(false);
  const [showManual, setShowManual] = useState(false); // State to control showing manual entry form
  const [identifier, setIdentifier] = useState(""); // State to hold the input data


  function handleBackFromCitations() {
    setShowCitations(false); // Set showCitations to false to hide the Citations component
  }

  function handleUpload() {
    // Add functionality for uploading here
    setShowCitations(true); // Show the Citations component
  }

  function handleManualEntry() {
    setShowManual(true); // Show manual entry form
  }

  function handleBackFromManual() {
    setShowManual(false); // Hide manual entry form
  }

  const handleInputChange = (event) => {
    setIdentifier(event.target.value); // Update the input data as the user types
  };

  return (
    <div className="home-container">
      <div className="home-search-bar">
      <input type="text" placeholder="Enter Author, Title, ISBN..." className="home-search-input" onChange={handleInputChange} />
        {/* Pass the input data as a query parameter */}
        <Link to={`/citations?identifier=${encodeURIComponent(identifier)}`} className="home-cite-button">Cite</Link>
      </div>
      <div className="home-button-container">
        <button className="home-upload-button" onClick={handleUpload}>Upload</button>
        <button className="home-manual-entry-button" onClick={handleManualEntry}>Manual Entry</button>
      </div>
      {showCitations && <FileContainer onBack={handleBackFromCitations} />}
      {showManual && <Manual onBack={handleBackFromManual} />} {/* Show manual entry form if showManual is true */}
    </div>
  );
}

export default Home;
