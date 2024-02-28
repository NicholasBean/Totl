import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Citations.css"; // Import Citations.css for styling

const Citations = () => {
  const [bookInfo, setBookInfo] = useState(null);
  const [coverURL, setCoverURL] = useState('');
  const [chicagoBib, setChicagoBib] = useState('');
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

  const generateChicagoBib = () => {
    if (bookInfo) {
      const author = bookInfo.author_name ? bookInfo.author_name.join(', ') : 'N/A';
      const title = bookInfo.title ? bookInfo.title : 'N/A';
      const publishYear = bookInfo.first_publish_year ? bookInfo.first_publish_year : 'N/A';
      const isbn = bookInfo.isbn ? bookInfo.isbn[0] : 'N/A';
      const publishPlace = bookInfo.publish_place ? bookInfo.publish_place[0] : 'N/A';
      const numberOfPages = bookInfo.number_of_pages_median ? bookInfo.number_of_pages_median : 'N/A';

      let chicagoBibEntry = `${author}. ${title}. ${publishYear}.`;
      if (isbn !== 'N/A') {
        chicagoBibEntry += ` ISBN ${isbn}.`;
      }
      if (publishPlace !== 'N/A') {
        chicagoBibEntry += ` ${publishPlace}:`;
      }
      if (numberOfPages !== 'N/A') {
        chicagoBibEntry += ` ${numberOfPages} pages.`;
      }
      setChicagoBib(chicagoBibEntry);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(chicagoBib);
    setCopyButtonText('Copied'); // Change button text to "Copied" when clicked
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([chicagoBib], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'chicago_bibliography.txt';
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
                <button className="chicago-cite-button" onClick={generateChicagoBib}>Chicago</button>
                {chicagoBib && (
                  <div>
                    <br />
                    <h3>Chicago Bibliography Entry</h3>
                    <p>{chicagoBib}</p>
                    <button className="copy-button" onClick={handleCopy}>{copyButtonText}</button>
                    <button className="download-button" onClick={handleDownload}>Download</button>
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
