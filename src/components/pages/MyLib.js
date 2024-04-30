import React, { useState, useEffect } from "react";
import MylibCitation from "./links/MylibCitation";
import './MyLib.css';

function MyLib() {
  const [selectedCitationStyle, setSelectedCitationStyle] = useState("chicago");
  const [citationContents, setCitationContents] = useState([]);

  const bookInfo = [
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
  ];

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
          <button className="copy-all-button">Copy Bibliography</button>
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
