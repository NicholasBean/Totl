const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 3001;


 // middleware
app.use(cors());
app.use(express.json());


// Routes //



// ------------------------------------------------------ //

// Create Citation for Author: //
app.post("/cite", async(req, res) => {
	try {
		const { author } = req.body;
		const newAuthor = await pool.query(
		"INSERT INTO citations (author) VALUES($1) RETURNING *",
		[author]);
		res.json(newAuthor.rows[0]);
	}
	catch (error) {
		console.error(error.message);
		console.log("Error, could not post.");
	}
});

// ------------------------------------------------------ //

// Get Authors from Citations Table //
app.get("/cite", async(req, res) => {
	try{
		const allAuthors = await pool.query(
		"SELECT * FROM citations");
		res.json(allAuthors.rows);
	}
	catch (error) {
		console.error(error.message);
		console.log("Error, could not get.");
	}
});


// ------------------------------------------------------ //

// Get a specific Author from Citations //
app.get("/cite/:id", async(req, res) => {
	try{
		const { id } = req.params;
		const author = await pool.query(
		"SELECT * FROM citations WHERE citation_id = $1",
		[id]);
		res.json(author.rows[0]);
	}
	catch (error) {
		console.error(error.message);
		console.log("Error, could not get specific.");
	}
});

// ------------------------------------------------------ //

// Update author from citations //
app.put("/cite/:id", async(req, res) => {
	try{
		const { id } = req.params;
		const { author } = req.body;
		
		const updateAuthor = await pool.query(
		"UPDATE citations SET author = $1 WHERE citation_id = $2",
		[author, id]
		);
		res.json("Authors Updated!");
	}
	catch (error) {
		console.error(error.message);
		console.log("Error, could not put.");
	}
});

// ------------------------------------------------------ //

// Delete Author from Citations //
app.delete("/cite/:id", async(req, res) => {
	try{
		const { id } = req.params;
		const deleteAuthor = await pool.query(
		"DELETE FROM citations WHERE citation_id = $1", 
		[id]
		);
		res.json("Author Deleted");
	}
	catch (error) {
		console.error(error.message);
		console.log("Error, could not delete.");
	}
	
});

// ------------------------------------------------------ //

app.listen(port, () => {
	console.log("this live on", {port});
});
