import { useEffect, useState } from "react";
import React, {Fragment} from react;
import editCitation from "./editDBdemo";

const listCitations = () => {

    const [citations, setCitations] = useState([]);
    

    // Delete function
    const deleteCitations = async (id) => {
        try {
            const deleteCitations = await fetch(`http://127.0.0.1:5432/citations/${id}`, {
                method: "DELETE"
            });

            setCitations(citations.filter(citations => citations.citation_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getCitations = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5432/citations");
            const jsonData = await response.json();
            setCitations(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getCitations();
    }, []);


    return (
    <Fragment>
        {" "}
        <table class="table mt-5 text-center">
            <thead>
            <tr>
                <th>Author</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
    </tr> */}
                {citations.map(citation =>(
                    <tr key ={citation.citation_id}>
                        <td>{citation.autor}</td>
                        <td>
                            <editCitation citations={citations}/>
                        </td>
                        <td> 
                            <button classname="btn btn-danger" onClick={() => deleteCitations(citations.citation_id)}> Delete </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table> 
  </Fragment>
  );
};

export default listCitations;