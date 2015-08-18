var mysql = require('mysql');

var connection = mysql.createConnection({

	host : 'localhost',
	user : 'root',
	password : 'Cam280204*',
	database : 'peluqueria'
});

connection.connect();

module.exports = connection;