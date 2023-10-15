const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'rentandomanos'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;