


CREATE DATABASE TotlBibDB;

CREATE TABLE citations(
    citation_id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    yearReleased INT
);