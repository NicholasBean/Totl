// Input to database 

import React, { useState } from "react";
import "./InputAuthors.css";

const InputAuthors = () => {
	const [author, SetAuthor] = useState("");
	
	const OnSubmitForm = async e => {
	e.preventDefault();
		try{
			const body = { author };
			const response = fetch("http://10.3.158.66:3001/cite", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			console.log(response);
			console.log("SUCCESS!");
		}
		catch (error){
			console.log("haha loser");
			console.error(error.message);
		}
	}
	return( 
	<div id="InputAuthorsDiv"> 
		<h1 className="text-center mt-5"> Current Authors </h1> 
		<form className="d-flex mt-5" onSubmit={OnSubmitForm}>
			<input type="text" 
			className="form-control" 
			value={author} 
			onChange={e => SetAuthor(e.target.value)}
			/>
			<button className="btn btn-success">Add</button>
		</form>
	</div>
	);
};

export default InputAuthors;
