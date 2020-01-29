const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "twubc01sql", //insert your own password here if yo created one
    database: "employeesDB"
});