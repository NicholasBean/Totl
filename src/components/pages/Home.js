import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { FileContainer } from "./links/FileContainer";
import Manual from "./links/Manual";
import "./Home.css";


function Home() {
  const [showCitations, setShowCitations] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [selectedOption, setSelectedOption] = useState("Archives");
  const navigate = useNavigate(); // Initialize useNavigate hook

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
      navigate(`/citations?identifier=${encodeURIComponent(identifier)}`); // Use navigate instead of history.push
    } else {
      console.log("Other options functionality can be implemented here.");
    }
  };

  const handleSignOut = () => {
    // Redirect to LoginPage
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-sign-out-container" onClick={handleSignOut}>
        <button className="home-sign-out-button">
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </button>
      </div>
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
