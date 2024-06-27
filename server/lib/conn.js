const mysql = require('mysql2');

connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "Cecilia",
    password: process.env.SQL_PASS,
    database: "todo"
});

module.exports = connection;