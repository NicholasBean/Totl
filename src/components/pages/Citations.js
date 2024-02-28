import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Citations.css"; // Import Citations.css for styling

const Citations = () => { 
  const [bookInfo, setBookInfo] = useState(null);
  const [coverURL, setCoverURL] = useState('');
  const [citationType, setCitationType] = useState('');
  const [citationContent, setCitationContent] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy'); // Track button text
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const identifier = searchParams.get("identifier");

    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(identifier)}`);
        if (response.data.docs && response.data.docs.length > 0) {
          setBookInfo(response.data.docs[0]);
          fetchCover(response.data.docs[0]);
        } else {
          setBookInfo(null);
        }
      } catch (error) {
        console.error('Error fetching book information:', error);
        setBookInfo(null);
      }
    };

    if (identifier) {
      fetchBookInfo();
    }
  }, [location.search]);

  const fetchCover = (book) => {
    if (book && book.cover_i) {
      const coverID = book.cover_i;
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
      setCoverURL(coverUrl);
    } else {
      setCoverURL('');
    }
  };

  const generateCitation = (type) => {
    if (bookInfo) {
      const author = bookInfo.author_name ? bookInfo.author_name.join(', ') : 'N/A';
      const title = bookInfo.title ? bookInfo.title : 'N/A';
      const publishYear = bookInfo.first_publish_year ? bookInfo.first_publish_year : 'N/A';
      const publisher = bookInfo.publisher ? bookInfo.publisher[0] : 'N/A';
      const city = bookInfo.publish_place ? bookInfo.publish_place[0] : 'N/A';

      let citationEntry = '';

      switch(type) {
        case 'chicago':
          citationEntry = `${author}. ${title}. ${publishYear}.`;
          if (bookInfo.isbn) {
            citationEntry += ` ISBN ${bookInfo.isbn[0]}.`;
          }
          if (city !== 'N/A') {
            citationEntry += ` ${city}:`;
          }
          if (bookInfo.number_of_pages_median) {
            citationEntry += ` ${bookInfo.number_of_pages_median} pages.`;
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

      setCitationType(type);
      setCitationContent(citationEntry);
    }
  };

  const handleCopy = (citation) => {
    navigator.clipboard.writeText(citation);
    setCopyButtonText('Copied'); // Change button text to "Copied" when clicked
  };

  const handleDownload = (citation, style) => {
    const element = document.createElement('a');
    const fileExtension = style === 'bibtex' ? 'bib' : 'txt'; // Set file extension based on citation style
    const file = new Blob([citation], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${style}_citation.${fileExtension}`; // Set the file extension accordingly
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <div className="header-container">
        {/* Header Content */}
        <h2>Book Information and Citations</h2>
      </div>
      <div className="citations-container">
        <div className="citations-result-section">
          {bookInfo && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {coverURL && <img src={coverURL} alt="Book Cover" style={{ marginRight: '20px' }} />}
              <div>
                <br />
                <h3>Title: {bookInfo.title}</h3>
                <p>Alternative Title: {bookInfo.alternative_title ? bookInfo.alternative_title : 'N/A'}</p>
                <p>Author: {bookInfo.author_name ? bookInfo.author_name.join(', ') : 'N/A'}</p>
                <p>First Publish Year: {bookInfo.first_publish_year}</p>
                <p>ISBN: {bookInfo.isbn ? bookInfo.isbn[0] : 'N/A'}</p>
                <p>Publish Place: {bookInfo.publish_place ? bookInfo.publish_place[0] : 'N/A'}</p>
                <p>Number of Pages: {bookInfo.number_of_pages_median ? bookInfo.number_of_pages_median : 'N/A'}</p>
                <button className="chicago-cite-button" onClick={() => generateCitation('chicago')}>Chicago</button>
                <button className="apa-cite-button" onClick={() => generateCitation('apa')}>APA</button>
                <button className="mla-cite-button" onClick={() => generateCitation('mla')}>MLA</button>
                <button className="bibtex-cite-button" onClick={() => generateCitation('bibtex')}>BibTeX</button>
                {citationType && citationContent && (
                  <div>
                    <br />
                    <h3>{citationType.toUpperCase()} Citation</h3>
                    <p>{citationContent}</p>
                    <button className="copy-button" onClick={() => handleCopy(citationContent)}>{copyButtonText}</button>
                    <button className="download-button" onClick={() => handleDownload(citationContent, citationType)}>Download</button>
                  </div>
                )}
              </div>
            </div>
          )}
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
