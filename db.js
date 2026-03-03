const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Welcome@1211",
    database: "ai_sprint_planning"
});

module.exports = { connection };