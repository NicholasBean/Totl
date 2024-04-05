import React from "react";
import MylibCitation from "./links/MylibCitation";

function MyLib() {
  return (
    <div className="Mylib-page">
      <div className="page-heading">
        <h1>MYLib</h1>
      </div>
      <div className="mylib-container">
      <select>
        <option>Chicago</option>
        <option>MLA</option>
        <option>APA</option>
        </select>
        <button className="copy-all-button">Copy Bibliography</button>
        <MylibCitation 
          info="Citation example one"
        />        
        <MylibCitation 
          info="Citation example two"
        />        
      <MylibCitation 
        info="Citation example three"
      />
      </div>
    </div>
  );
}

export default MyLib;
