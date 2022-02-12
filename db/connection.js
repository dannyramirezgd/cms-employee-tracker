const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: 'root',
        password: 'mysql0716!',
        database: 'organization'
    },
    console.log('Connected to the Organization Database')
)

module.exports = db;