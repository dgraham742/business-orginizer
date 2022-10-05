const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',

    user:'root',
    password:'Deedeedog#1',
    database:'organizer'
});

module.exports = db;