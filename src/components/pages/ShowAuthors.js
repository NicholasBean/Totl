// Show Authors
import React, { Fragment, useEffect, useState } from "react";
import "./ShowAuthors.css";


const ShowAuthors = () => {
	const [authors, SetAuthors] = useState([]);
	
	
	const GetAuthors = async () => {
		try{
			const response = await fetch("http://10.3.158.66:3001/cite");
			const JsonData = await response.json();	
			SetAuthors(JsonData);
		}
		catch (error) {
			console.error(error.message);
		}
	};
	
	useEffect(() => {
	   GetAuthors();
	}, []);
	
	return(
		<div id="ShowAuthorDiv">  
		{ " " }
			<table className="table mt-5 text-center" color="tomato" id="tableguy">
			    <thead>
			      <tr>
				<th>Author Name</th>
				<th>Edit</th>
				<th>Delete</th>
			      </tr>
			    </thead>
			    
			    <tbody>
			      {authors.map(citations => (
			      	<tr>
			      		<td> {citations.author} </td>
			      		<td> Edit </td>
			      		<td> Delete </td>
			      	</tr>
			      ))}
			    </tbody>
			</table>
		</div>
	);
};


export default ShowAuthors;
