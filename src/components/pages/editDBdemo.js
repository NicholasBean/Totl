import React, { Fragment, useState } from "react";

const editCitation = ({ citations }) => {

    const [author, setAuthor] = useState(citation.author);

    //edit author function
    const updateAuthor = async() => {
        try {
            const body = { author }
            const response = await fetch(`http://127.0.0.1:5432/citations/${citations.citation_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json "},
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return <Fragment>
        <button type="button" 
        class="btn btn-warning" 
        data-toggle="modal" 
        data-target={`#id${citations.citation_id}`}
        >
        Edit
        </button>

        <div class="modal" id={`id${citations.citation_id}`} onClick={() => setAuthor(citations.author)}>
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title">Edit Citation</h4>
                        <button 
                            type="button" 
                            class="close" 
                            data-dismiss="modal"
                            onClick={() => setAuthor(citations.author)}
                        >
                                &times;
                        </button>
                    </div>

                    <div class="modal-body">
                        <input type="text" 
                        className="form-control />" 
                        value={author} 
                        onChange={e => setAuthor(e.target.value)}
                        />
                    </div>

                    <div class="modal-footer">
                        <button type="button" 
                        class="btn btn-warning" 
                        data-dismiss="modal"
                        onClick = {e => updateAuthor(e)}
                        >
                            Edit
                        </button>
                        <button type="button" c
                            lass="btn btn-danger" 
                            data-dismiss="modal"
                            onClick={() => setAuthor(citations.author)}
                            >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
};

export default editCitation;
