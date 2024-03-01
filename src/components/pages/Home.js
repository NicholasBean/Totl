import React, { useState } from "react";
import { FileContainer } from "./links/FileContainer";
import Manual from "./links/Manual";
import "./Home.css";

function Home() {
  const [showCitations, setShowCitations] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [selectedOption, setSelectedOption] = useState("Archives"); 

  function handleBackFromCitations() {
    setShowCitations(false);
  }

  function handleUpload() {
    setShowCitations(true);
  }

  function handleManualEntry() {
    setShowManual(true);
  }

  function handleBackFromManual() {
    setShowManual(false);
  }

  const handleInputChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCite = () => {
    if (selectedOption === "Archives") {
      // Redirect to citations page with identifier as query parameter
      window.location.href = `/citations?identifier=${encodeURIComponent(identifier)}`;
    } else {
      console.log("Other options functionality can be implemented here.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-search-bar">
        <input
          type="text"
          placeholder="Enter Author, Title, ISBN..."
          className="home-search-input"
          onChange={handleInputChange}
        />
        <select value={selectedOption} onChange={handleDropdownChange} className="home-dropdown">
          <option value="Archives">Archives</option>
          <option value="Recent">Recent</option>
          <option value="Other">Other</option>
        </select>
        <button className="home-cite-button" onClick={handleCite}>
          Cite
        </button>
      </div>
      <div className="home-button-container">
        <button className="home-upload-button" onClick={handleUpload}>
          Upload
        </button>
        <button className="home-manual-entry-button" onClick={handleManualEntry}>
          Manual Entry
        </button>
      </div>
      {showCitations && <FileContainer onBack={handleBackFromCitations} />}
      {showManual && <Manual onBack={handleBackFromManual} />}
    </div>
  );
}

export default Home;
