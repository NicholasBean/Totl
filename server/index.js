const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Routes //

//Create a citation
app.post("/citations", async(req, res) =>{
    try {
        const { citation } = req.body;
        const newCitation = await pool.query("INSERT INTO citations (author) VALUES($1) RETURNING *", 
        [author]
    );
    res.json(newCitation.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});


//Get all citations
app.get("/citations", async(req, res) =>{
    try {
        const allCitations = await pool.query("SELECT * FROM citations")
        res.json(allCitations.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//Get specific citation via citation_id
app.get("/citations/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const cite = await pool.query("SELECT * FROM citations WHERE todo_id = $1", [id])
        res.json(citations.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});


//Update citations
app.put("citations/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { author } = req.body;
        const updateCitation = await pool.query("UPDATE citations SET author = $1 WHERE citation_id = $2", [author, id]);

        res.json("Citation Updated.");
    } catch (error) {
        console.error(error.message);
    }
});


//Delete citations
app.delete("/citations/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const deleteCitation = await pool.query("DELETE FROM citations WHERE citation_id = $1", [id]);
        res.json("Citation deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

