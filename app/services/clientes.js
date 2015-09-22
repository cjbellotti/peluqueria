var app = require('../../lib/crud')(require('../models/clientes'));
var db = require('../../lib/db');

app.get('/clientes-by-nombre/:nombre/:apellido', function (req, res) {

	var query = "SELECT * FROM CLIENTES WHERE NOMBRE = '" + req.params.nombre + "' AND APELLIDO = '" + req.params.apellido + "'";

	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

module.exports = app;