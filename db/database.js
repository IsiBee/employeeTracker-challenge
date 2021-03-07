const mysql = require('mysql2');
const dotenv = require('dotenv').config();

//Connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employee_tracker_db'
});

module.exports = connection;