const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "totl",
    password: "g0valp0",
    host: "10.3.158.66",
    database: "totl",
    port: 5432
});

module.exports = pool;
