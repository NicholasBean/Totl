const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "totl",
    password: "g0valp0",
    host: "127.0.0.1",
    database: "totl",
    port: 5432
});

module.exports = pool;