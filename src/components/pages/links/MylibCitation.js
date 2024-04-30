import React from "react";

const MylibCitation = ({ content }) => {
  const handleCopy = (citation) => {
    navigator.clipboard.writeText(citation);
  };

  // Function to format the citation content with italic titles
  const formatCitationContent = (content) => {
    // Regular expression to match the book titles
    const titleRegex = /<i>(.*?)<\/i>/g;
    // Replace book titles with italic formatting
    const formattedContent = content.replace(
      titleRegex,
      (match, title) => `<i>${title}</i>`
    );
    return formattedContent;
  };

  // Format the citation content before rendering
  const formattedContent = formatCitationContent(content);

  return (
    <div className="citation-item">
      {/* Render formatted citation content */}
      <div className="citation-info" dangerouslySetInnerHTML={{ __html: formattedContent }} />
      <div className="citation-btns">
        <button className="copy-btn" onClick={() => handleCopy(content)}>Copy Item</button>
        <button className="delete-btn">Delete</button>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default MylibCitation;
