import React, { useState, useEffect } from "react";
import MylibCitation from "./links/MylibCitation";
import './MyLib.css';

function MyLib() {
  const [citationTypes, setCitationTypes] = useState([]);
  const [citationContents, setCitationContents] = useState([]);
  const [selectedCitationStyle, setSelectedCitationStyle] = useState("chicago");

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
    // Generate citations for all books initially
    const updatedCitationTypes = bookInfo.map(() => selectedCitationStyle);
    const updatedCitationContents = bookInfo.map((book) => generateCitationContent(selectedCitationStyle, book));
    setCitationTypes(updatedCitationTypes);
    setCitationContents(updatedCitationContents);
  }, [selectedCitationStyle, bookInfo]);

  const generateCitation = (type) => {
    // Generate citations for all books when the citation style is changed
    const updatedCitationTypes = bookInfo.map(() => type);
    const updatedCitationContents = bookInfo.map((book) => generateCitationContent(type, book));
    setCitationTypes(updatedCitationTypes);
    setCitationContents(updatedCitationContents);
  };

  const generateCitationContent = (type, book) => {
    const author = book.author;
    const title = book.title;
    const publishYear = book.publishYear;
    const city = book.city;
    const pages = book.pages;
    let citationEntry = "";

    switch (type) {
      case "chicago":
        citationEntry = `${author}. ${title}. ${publishYear}. ${city}`;
        if (book.isbn) {
          citationEntry += ` ISBN ${book.isbn}.`;
        }
        if (city !== "N/A") {
          citationEntry += ` ${city}:`;
        }
        if (pages) {
          citationEntry += ` ${pages} pages.`;
        }
        break;
      case "apa":
        citationEntry = `${author} (${publishYear}). ${title}. ${city}.`;
        break;
      case "mla":
        citationEntry = `${author}. *${title}*. ${city}, ${publishYear}.`;
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
                author={bookInfo[index].author}
                title={bookInfo[index].title}
                year={bookInfo[index].publishYear}
                isbn={bookInfo[index].isbn}
                location={bookInfo[index].city}
                pages={bookInfo[index].pages}
                citationStyle={citationTypes[index]} // Pass citation style from state
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
