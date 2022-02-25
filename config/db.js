const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sakshi6391#',
    database: 'pm-n-am'

});
connection.connect((err) => {
    if (err) {
        throw new Error(err);
    }
    else {
        console.log('MYSQL Connected');
    }
})

module.exports = connection;

