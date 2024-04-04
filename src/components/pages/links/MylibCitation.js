import React from "react";

const MylibCitation = (props) => {
  
    return (
      <div className="citation-item">
          <p className="citation-info">{props.info}</p>
          <div className="citation-btns">
            <button className="copy-btn">Copy Item</button>
            <button className="delete-btn">Delete</button>
            <button className="edit-btn">Edit</button>
          </div>
        </div>
    );
}

export default MylibCitation;
