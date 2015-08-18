var mysql = require('mysql');

var connection = mysql.createConnection({

	host : 'localhost',
	user : 'root',
	password : 'Cam280204*',
	database : 'peluqueria'
});

connection.connect();
connection.query('select * from clientes', function (err, rows, fields) {
	if (err) throw err;

	console.log('<<<<<<--------------->>>>>');
	console.log(rows);

});

connection.end();