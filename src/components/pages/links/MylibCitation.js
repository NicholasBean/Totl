import React from "react";

const MylibCitation = ({ content }) => {

  const textToUnicodeItalics = (text) => {
    const italicMap = {
      // Lowercase letters
      a: '𝑎',
      b: '𝑏',
      c: '𝑐',
      d: '𝑑',
      e: '𝑒',
      f: '𝑓',
      g: '𝑔',
      h: 'ℎ',
      i: '𝑖',
      j: '𝑗',
      k: '𝑘',
      l: '𝑙',
      m: '𝑚',
      n: '𝑛',
      o: '𝑜',
      p: '𝑝',
      q: '𝑞',
      r: '𝑟',
      s: '𝑠',
      t: '𝑡',
      u: '𝑢',
      v: '𝑣',
      w: '𝑤',
      x: '𝑥',
      y: '𝑦',
      z: '𝑧',
      // Uppercase letters
      A: '𝐴',
      B: '𝐵',
      C: '𝐶',
      D: '𝐷',
      E: '𝐸',
      F: '𝐹',
      G: '𝐺',
      H: '𝐻',
      I: '𝐼',
      J: '𝐽',
      K: '𝐾',
      L: '𝐿',
      M: '𝑀',
      N: '𝑁',
      O: '𝑂',
      P: '𝑃',
      Q: '𝑄',
      R: '𝑅',
      S: '𝑆',
      T: '𝑇',
      U: '𝑈',
      V: '𝑉',
      W: '𝑊',
      X: '𝑋',
      Y: '𝑌',
      Z: '𝑍',
      // Common diacritics (lowercase)
      'à': '𝑎̀',
      'á': '𝑎́',
      'â': '𝑎̂',
      'ä': '𝑎̈',
      'å': '𝑎̊',
      'ç': '𝑐̧',
      'è': '𝑒̀',
      'é': '𝑒́',
      'ê': '𝑒̂',
      'ë': '𝑒̈',
      'ì': '𝑖̀',
      'í': '𝑖́',
      'î': '𝑖̂',
      'ï': '𝑖̈',
      'ñ': '𝑛̃',
      'ò': '𝑜̀',
      'ó': '𝑜́',
      'ô': '𝑜̂',
      'ö': '𝑜̈',
      'ø': '𝑜̊',
      'ù': '𝑢̀',
      'ú': '𝑢́',
      'û': '𝑢̂',
      'ü': '𝑢̈',
      'ý': '𝑦́',
      'ÿ': '𝑦̈',
      // Common diacritics (uppercase)
      'À': '𝐴̀',
      'Á': '𝐴́',
      'Â': '𝐴̂',
      'Ä': '𝐴̈',
      'Å': '𝐴̊',
      'Ç': '𝐶̧',
      'È': '𝐸̀',
      'É': '𝐸́',
      'Ê': '𝐸̂',
      'Ë': '𝐸̈',
      'Ì': '𝐼̀',
      'Í': '𝐼́',
      'Î': '𝐼̂',
      'Ï': '𝐼̈',
      'Ñ': '𝑁̃',
      'Ò': '𝑂̀',
      'Ó': '𝑂́',
      'Ô': '𝑂̂',
      'Ö': '𝑂̈',
      'Ø': '𝑂̊',
      'Ù': '𝑈̀',
      'Ú': '𝑈́',
      'Û': '𝑈̂',
      'Ü': '𝑈̈',
      'Ý': '𝑌́',
      'Ÿ': '𝑌̈',
      // Add more characters as needed
    };  
  
    // Replace each character with its Unicode italic counterpart
    return text.replace(/\D/g, (char) => {
      // Check if the character has an italic counterpart in the map
      return italicMap[char] || char;
    });
  };
  
  const handleCopy = (citation) => {
    // Format the citation content with italic tags before copying
    const formattedCitation = formatCitationContent(citation);
    // Replace HTML <span> elements with Unicode italics
    const unicodeCitation = replaceHtmlWithUnicode(formattedCitation);
    navigator.clipboard.writeText(unicodeCitation);
  };

  const handleEdit = (citation) => {
    console.log("edit clicked");
  };

  const handleDelete = (citation) => {
    console.log("delete clicked");
  };
  
  const replaceHtmlWithUnicode = (text) => {
    const spanRegex = /<span class="italic">(.*?)<\/span>/g;

    return text.replace(spanRegex, (match, content) => {

        return `${textToUnicodeItalics(content)}`; 
    });
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
        <button className="delete-btn" onClick={() => handleDelete}>Delete</button>
        <button className="edit-btn" onClick={() => handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default MylibCitation;
