import React from "react";

const MylibCitation = (props) => {
  // Function to generate citation content based on citation style
  const generateCitationContent = () => {
    // Switch statement to generate citation content based on citation style
    switch (props.citationStyle) {
      case "chicago":
        // Return Chicago style citation content
        return `${props.author}. ${props.title}. ${props.year}. ${props.publisher}`;
      case "mla":
        // Return MLA style citation content
        return `${props.author}. *${props.title}*. ${props.location}, ${props.year}.`;
      case "apa":
        // Return APA style citation content
        return `${props.author} (${props.year}). ${props.title}. ${props.location}: ${props.publisher}.`;
      case "bibtex":
        // Return BibTeX style citation content
        return `@book{key,
  author = {${props.author}},
  title = {${props.title}},
  publisher = {${props.publisher}},
  year = {${props.year}},
}`;
      default:
        return "";
    }
  };

  return (
    <div className="citation-item">
      {/* Render citation content based on citation style */}
      <div className="citation-info">{generateCitationContent()}</div>
      <div className="citation-btns">
        <button className="copy-btn">Copy Item</button>
        <button className="delete-btn">Delete</button>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default MylibCitation;
