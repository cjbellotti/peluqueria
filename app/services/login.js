var app = require('express')();
var db = require('../../lib/db');

app.post('/login', function (req, res) {

	var query = "SELECT * FROM USUARIOS WHERE USER_ID = '" + req.body.usuario + "' AND USER_PASSWORD =  '" + req.body.clave + "'";

	db.query(query, function (err, rows) {

		var data = {};

		if(err)
			data = err;
		else
			if (rows.length > 0)
				data.resultado = 'OK';
			else
				data.resultado = 'ERROR';

		res.json(data)
			.end();

	});

});

module.exports = app;