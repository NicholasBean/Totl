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
    // Combine all citation contents into a single string
    const combinedCitation = citationContents.join("\n");
    // Format the citation content with italic tags before copying
    const formattedCitation = formatCitationContent(combinedCitation);
    // Replace HTML <span> elements with Unicode italics
    const unicodeCitation = replaceHtmlWithUnicode(formattedCitation);
    navigator.clipboard.writeText(unicodeCitation);
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
