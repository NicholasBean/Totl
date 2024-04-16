import React from "react";
import MylibCitation from "./links/MylibCitation";
import './MyLib.css';

/*
  MYLIB 
  - FUNCTIONALITY (SELECT), (CITATION STYLE)
  - STYLE
  MYLIBCITATION 
  - STYLE
  - FUNCTIONALITY (CITATIONS)
  RESEARCH DATABASE FOR ADDING THIS DATA TO POSTGRESQL
  STYLES
  - KEEP IT IN ACCOUNT


  upload your changes to app.css and mylib.css
*/

function MyLib() {
  return (
    <div className="Mylib-page">

      <table className="mylib-table">
        <tr>
          <th>Author(s)</th>
          <th>Title</th>
          <th>Year</th>
          <th>ISBN</th>
          <th>Publishing Location</th>
          <th>Pages</th>
        </tr>
        <tr>
          <td>Harold Abelson, Gerald Jay Sussman, Julie Sussman</td>
          <td>Structure and Interpretation of Computer Programs</td>
          <td>1985</td> 
          <td>9788320427127</td>
          <td>Paris</td>
          <td>595</td>
        </tr>
        <tr>
          <td>Mark Lutz, David Ascher</td>
          <td>Learning Python</td>
          <td>1999</td> 
          <td>1565924649</td>
          <td>Taipei</td>
          <td>591</td>
        </tr>

      </table>


      <div className="mylib-container">
        <div>

          <select className="citation-style-select">
            <option>Chicago</option>
            <option>MLA</option>
            <option>APA</option>
          </select>
          <button className="copy-all-button">Copy Bibliography</button>

        </div>

        <MylibCitation 
          author="Harold Abelson, Gerald Jay Sussman, Julie Sussman."
          title="Structure and Interpretation of Computer Programs (SICP)."
          year="1985." 
          isbn="ISBN 9788320427127." 
          location="Paris:"
          pages="595 pages."
        />        
        <MylibCitation 
          author="Mark Lutz, David Ascher." 
          title="Learning Python." 
          year="1999." 
          isbn="ISBN 1565924649." 
          location="Taipei:" 
          pages="591 pages."
        />        
      </div>
    </div>
  );
}

export default MyLib;
