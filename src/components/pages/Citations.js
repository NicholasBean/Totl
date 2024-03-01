import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Citations.css";

const Citations = () => {
  const [bookInfo, setBookInfo] = useState([]);
  const [coverURLs, setCoverURLs] = useState([]);
  const [citationTypes, setCitationTypes] = useState([]);
  const [citationContents, setCitationContents] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [numInitialResults, setNumInitialResults] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const identifier = searchParams.get("identifier");

    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(identifier)}`);
        if (response.data.docs && response.data.docs.length > 0) {
          setBookInfo(response.data.docs.slice(0, numInitialResults));
          setCoverURLs([]);
          response.data.docs.slice(0, numInitialResults).forEach(book => {
            fetchCover(book);
          });
          initializeCitationStates(response.data.docs.slice(0, numInitialResults).length);
        } else {
          setBookInfo([]);
        }
      } catch (error) {
        console.error('Error fetching book information:', error);
        setBookInfo([]);
      }
    };

    if (identifier) {
      fetchBookInfo();
    }
  }, [location.search, numInitialResults]);

  const initializeCitationStates = (count) => {
    const initialCitationTypes = Array(count).fill('');
    const initialCitationContents = Array(count).fill('');
    setCitationTypes(initialCitationTypes);
    setCitationContents(initialCitationContents);
  };

  const fetchCover = (book) => {
    if (book && book.cover_i) {
      const coverID = book.cover_i;
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
      setCoverURLs(prevState => [...prevState, coverUrl]);
    } else {
      setCoverURLs(prevState => [...prevState, '']);
    }
  };

  const generateCitation = (type, bookIndex) => {
    if (bookInfo && bookInfo[bookIndex]) {
      const book = bookInfo[bookIndex];
      const author = book.author_name ? book.author_name.join(', ') : 'N/A';
      const title = book.title ? book.title : 'N/A';
      const publishYear = book.first_publish_year ? book.first_publish_year : 'N/A';
      const publisher = book.publisher ? book.publisher[0] : 'N/A';
      const city = book.publish_place ? book.publish_place[0] : 'N/A';

      let citationEntry = '';

      switch(type) {
        case 'chicago':
          citationEntry = `${author}. ${title}. ${publishYear}.`;
          if (book.isbn) {
            citationEntry += ` ISBN ${book.isbn[0]}.`;
          }
          if (city !== 'N/A') {
            citationEntry += ` ${city}:`;
          }
          if (book.number_of_pages_median) {
            citationEntry += ` ${book.number_of_pages_median} pages.`;
          }
          break;
        case 'apa':
          citationEntry = `${author} (${publishYear}). ${title}. ${city}: ${publisher}.`;
          break;
        case 'mla':
          citationEntry = `${author}. *${title}*. ${publisher}, ${publishYear}.`;
          break;
        case 'bibtex':
          citationEntry = `@book{key,
    author = {${author}},
    title = {${title}},
    publisher = {${publisher}},
    year = {${publishYear}},
}`;
          break;
        default:
          citationEntry = '';
      }

      const updatedCitationTypes = [...citationTypes];
      updatedCitationTypes[bookIndex] = type;
      setCitationTypes(updatedCitationTypes);

      const updatedCitationContents = [...citationContents];
      updatedCitationContents[bookIndex] = citationEntry;
      setCitationContents(updatedCitationContents);
    }
  };

  const handleCopy = (citation) => {
    navigator.clipboard.writeText(citation);
    setCopyButtonText('Copied');
  };

  const handleDownload = (citation, style) => {
    const element = document.createElement('a');
    const fileExtension = style === 'bibtex' ? 'bib' : 'txt';
    const file = new Blob([citation], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${style}_citation.${fileExtension}`;
    document.body.appendChild(element);
    element.click();
  };

  const handleNumResultsChange = (e) => {
    setNumInitialResults(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div className="header-container">
        <h2>Book Information and Citations</h2>
      </div>
      <div className="citations-container">
        <div className="citations-result-section">
          <div className="filter-container">
            <label htmlFor="num-results">Show:</label>
            <select id="num-results" value={numInitialResults} onChange={handleNumResultsChange}>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          {bookInfo && bookInfo.map((book, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {coverURLs[index] && <img src={coverURLs[index]} alt="Book Cover" style={{ marginRight: '20px' }} />}
              <div>
                <br />
                <h3>Title: {book.title}</h3>
                <p>Alternative Title: {book.alternative_title ? book.alternative_title : 'N/A'}</p>
                <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                <p>First Publish Year: {book.first_publish_year}</p>
                <p>ISBN: {book.isbn ? book.isbn[0] : 'N/A'}</p>
                <p>Publish Place: {book.publish_place ? book.publish_place[0] : 'N/A'}</p>
                <p>Number of Pages: {book.number_of_pages_median ? book.number_of_pages_median : 'N/A'}</p>
                <button className="chicago-cite-button" onClick={() => generateCitation('chicago', index)}>Chicago</button>
                <button className="apa-cite-button" onClick={() => generateCitation('apa', index)}>APA</button>
                <button className="mla-cite-button" onClick={() => generateCitation('mla', index)}>MLA</button>
                <button className="bibtex-cite-button" onClick={() => generateCitation('bibtex', index)}>BibTeX</button>
                {citationTypes[index] && citationContents[index] && (
                  <div>
                    <br />
                    <h3>{citationTypes[index].toUpperCase()} Citation</h3>
                    <p>{citationContents[index]}</p>
                    <button className="copy-button" onClick={() => handleCopy(citationContents[index])}>{copyButtonText}</button>
                    <button className="download-button" onClick={() => handleDownload(citationContents[index], citationTypes[index])}>Download</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="citations-other-section">
        {/* Other content */}
      </div>
    </div>
  );
};

export default Citations;
