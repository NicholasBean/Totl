import React, { useState, useEffect, useMemo } from "react";
import MylibCitation from "./links/MylibCitation";
import './MyLib.css';

function MyLib() {
  const [selectedCitationStyle, setSelectedCitationStyle] = useState("chicago");
  const [citationContents, setCitationContents] = useState([]);

  const bookInfo = useMemo(() => [
    {
      author: "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
      title: "Structure and Interpretation of Computer Programs",
      publishYear: "1985",
      isbn: "9788320427127",
      city: "Paris",
      pages: "595"
    },
    {
      author: "Mark Lutz, David Ascher",
      title: "Learning Python",
      publishYear: "1999",
      isbn: "1565924649",
      city: "Taipei",
      pages: "591"
    }
  ], []);

  useEffect(() => {
    const updatedCitationContents = bookInfo.map(book => generateCitationContent(selectedCitationStyle, book));
    setCitationContents(updatedCitationContents);
  }, [selectedCitationStyle, bookInfo]);

  const generateCitationContent = (type, book) => {
    const author = book.author;
    const title = book.title;
    const publishYear = book.publishYear;
    const city = book.city;
    const pages = book.pages;
    let citationEntry = "";
  
    switch (type) {
      case "chicago":
        citationEntry = `${author}. <span class="italic">${title}</span>. ${publishYear}. `;
        if (city !== "N/A") {
          citationEntry += ` ${city}:`;
        }
        if (pages) {
          citationEntry += ` ${pages}.`;
        }
        break;
      case "apa":
        citationEntry = `${author} (${publishYear}). <span class="italic">${title}</span>. ${city}.`;
        break;
      case "mla":
        citationEntry = `${author}. <span class="italic">${title}</span>. ${city}, ${publishYear}.`;
        break;
      case "bibtex":
        citationEntry = `@book{key,
      author = {${author}},
      title = {${title}},
      publisher = {${city}},
      year = {${publishYear}},
  }`;
        break;
      default:
        citationEntry = "";
    }
  
    return citationEntry;
  };

  const textToUnicodeItalics = (text) => {
    const italicMap = {
      // Lowercase letters
      a: 'ð‘Ž',
      b: 'ð‘',
      c: 'ð‘',
      d: 'ð‘‘',
      e: 'ð‘’',
      f: 'ð‘“',
      g: 'ð‘”',
      h: 'â„Ž',
      i: 'ð‘–',
      j: 'ð‘—',
      k: 'ð‘˜',
      l: 'ð‘™',
      m: 'ð‘š',
      n: 'ð‘›',
      o: 'ð‘œ',
      p: 'ð‘',
      q: 'ð‘ž',
      r: 'ð‘Ÿ',
      s: 'ð‘ ',
      t: 'ð‘¡',
      u: 'ð‘¢',
      v: 'ð‘£',
      w: 'ð‘¤',
      x: 'ð‘¥',
      y: 'ð‘¦',
      z: 'ð‘§',
      // Uppercase letters
      A: 'ð´',
      B: 'ðµ',
      C: 'ð¶',
      D: 'ð·',
      E: 'ð¸',
      F: 'ð¹',
      G: 'ðº',
      H: 'ð»',
      I: 'ð¼',
      J: 'ð½',
      K: 'ð¾',
      L: 'ð¿',
      M: 'ð‘€',
      N: 'ð‘',
      O: 'ð‘‚',
      P: 'ð‘ƒ',
      Q: 'ð‘„',
      R: 'ð‘…',
      S: 'ð‘†',
      T: 'ð‘‡',
      U: 'ð‘ˆ',
      V: 'ð‘‰',
      W: 'ð‘Š',
      X: 'ð‘‹',
      Y: 'ð‘Œ',
      Z: 'ð‘',
      // Common diacritics (lowercase)
      'Ã ': 'ð‘ŽÌ€',
      'Ã¡': 'ð‘ŽÌ',
      'Ã¢': 'ð‘ŽÌ‚',
      'Ã¤': 'ð‘ŽÌˆ',
      'Ã¥': 'ð‘ŽÌŠ',
      'Ã§': 'ð‘Ì§',
      'Ã¨': 'ð‘’Ì€',
      'Ã©': 'ð‘’Ì',
      'Ãª': 'ð‘’Ì‚',
      'Ã«': 'ð‘’Ìˆ',
      'Ã¬': 'ð‘–Ì€',
      'Ã­': 'ð‘–Ì',
      'Ã®': 'ð‘–Ì‚',
      'Ã¯': 'ð‘–Ìˆ',
      'Ã±': 'ð‘›Ìƒ',
      'Ã²': 'ð‘œÌ€',
      'Ã³': 'ð‘œÌ',
      'Ã´': 'ð‘œÌ‚',
      'Ã¶': 'ð‘œÌˆ',
      'Ã¸': 'ð‘œÌŠ',
      'Ã¹': 'ð‘¢Ì€',
      'Ãº': 'ð‘¢Ì',
      'Ã»': 'ð‘¢Ì‚',
      'Ã¼': 'ð‘¢Ìˆ',
      'Ã½': 'ð‘¦Ì',
      'Ã¿': 'ð‘¦Ìˆ',
      // Common diacritics (uppercase)
      'Ã€': 'ð´Ì€',
      'Ã': 'ð´Ì',
      'Ã‚': 'ð´Ì‚',
      'Ã„': 'ð´Ìˆ',
      'Ã…': 'ð´ÌŠ',
      'Ã‡': 'ð¶Ì§',
      'Ãˆ': 'ð¸Ì€',
      'Ã‰': 'ð¸Ì',
      'ÃŠ': 'ð¸Ì‚',
      'Ã‹': 'ð¸Ìˆ',
      'ÃŒ': 'ð¼Ì€',
      'Ã': 'ð¼Ì',
      'ÃŽ': 'ð¼Ì‚',
      'Ã': 'ð¼Ìˆ',
      'Ã‘': 'ð‘Ìƒ',
      'Ã’': 'ð‘‚Ì€',
      'Ã“': 'ð‘‚Ì',
      'Ã”': 'ð‘‚Ì‚',
      'Ã–': 'ð‘‚Ìˆ',
      'Ã˜': 'ð‘‚ÌŠ',
      'Ã™': 'ð‘ˆÌ€',
      'Ãš': 'ð‘ˆÌ',
      'Ã›': 'ð‘ˆÌ‚',
      'Ãœ': 'ð‘ˆÌˆ',
      'Ã': 'ð‘ŒÌ',
      'Å¸': 'ð‘ŒÌˆ',
      // Add more characters as needed
    };  
  
    // Replace each character with its Unicode italic counterpart
    return text.replace(/\D/g, (char) => {
      // Check if the character has an italic counterpart in the map
      return italicMap[char] || char;
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

  const replaceHtmlWithUnicode = (text) => {
    const spanRegex = /<span class="italic">(.*?)<\/span>/g;

    return text.replace(spanRegex, (match, content) => {

        return `${textToUnicodeItalics(content)}`; 
    });
  };
  
const handleCopyAll = (citationContents) => {
  const combinedCitation = citationContents.join("\n");
  const formattedCitation = formatCitationContent(combinedCitation);
  const unicodeCitation = replaceHtmlWithUnicode(formattedCitation);

  // Attempt to copy to clipboard using navigator.clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(unicodeCitation)
      .then(() => {
        console.log("Bibliography copied successfully!");
      })
      .catch((error) => {
        console.error("Unable to copy bibliography using navigator.clipboard: ", error);
        // If copying fails, fall back to manual copy
        handleCopyFallback(unicodeCitation);
      });
  } else {
    // If navigator.clipboard is not available, fall back to manual copy
    handleCopyFallback(unicodeCitation);
  }
};

const handleCopyFallback = (text) => {
  // Display the text in a textarea for manual copy
  // Navigator.clipboard doesn't work for all systems. 
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  if (document.execCommand('copy')) {
    console.log('Text copied to clipboard');
  } else {
    console.error('Unable to copy text to clipboard');
  }
  document.body.removeChild(textarea);
};


  return (
    <div className="Mylib-page">
      <table className="mylib-table">
        <tbody>
          <tr>
            <th>Author(s)</th>
            <th>Title</th>
            <th>Year</th>
            <th>ISBN</th>
            <th>Publishing Location</th>
            <th>Pages</th>
          </tr>
          {bookInfo.map((book, index) => (
            <tr key={index}>
              <td>{book.author}</td>
              <td>{book.title}</td>
              <td>{book.publishYear}</td>
              <td>{book.isbn}</td>
              <td>{book.city}</td>
              <td>{book.pages}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mylib-container">
        <div>
          <select className="citation-style-select" onChange={(e) => setSelectedCitationStyle(e.target.value)}>
            <option value="chicago">Chicago</option>
            <option value="mla">MLA</option>
            <option value="apa">APA</option>
            <option value="bibtex">BibTeX</option>
          </select>
          <button className="copy-all-button" onClick={() => handleCopyAll(citationContents)}>Copy Bibliography</button>
        </div>

        <div>
          {citationContents.map((content, index) => (
            <div key={index}>
              <MylibCitation
                key={index} // Adding key prop
                content={content} // Pass citation content
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyLib;
