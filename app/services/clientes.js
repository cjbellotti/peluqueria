/*var app = require('express')();
var db = require('../../lib/db');

app.get('/clientes', function (req, res) {
	db.query('SELECT * FROM CLIENTES', function(err, rows) {
		var data = err || rows;
		res.json(data)
			.end();
	});
});

app.post('/clientes', function (req, res) {

	var query = "INSERT INTO CLIENTES (NOMBRE, APELLIDO, " +
				"EMAIL, TELEFONO, DIRECCION"
});

module.exports = app; */

module.exports = require('../../lib/crud')('clientes');