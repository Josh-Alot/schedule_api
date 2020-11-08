const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'BasedSarah2020',
    database: 'petshop_schedule'
});

module.exports = connection;