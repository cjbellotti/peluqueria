var TurnosDef = require('../models/turnos');
var app = require('../../lib/crud')(TurnosDef);
var db = require('../../lib/db');

app.get('/turnos-by-cliente/:id_cliente', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', P.NOMBRE as 'PROFESIONAL'," + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.ID_CLIENTE = " + req.params.id_cliente + 
				" AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL"

	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/turnos-by-profesional/:id_profesional', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', P.NOMBRE as 'PROFESIONAL'," + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.ID_PROFESIONAL = " + req.params.id_profesional + 
				" AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL"

	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/turnos-by-fecha/:fecha/:id_cliente?/:id_profesional?', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', ID_PROFESIONAL, P.NOMBRE as 'PROFESIONAL', " + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.FECHA = STR_TO_DATE('" + req.params.fecha + "', '%Y-%m-%d')" +
				"    AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL";

	if (req.params.id_cliente)
		query += " AND T.ID_CLIENTE = " + req.params.id_cliente;

	if (req.params.id_profesional)
		query += " AND T.ID_PROFESIONAL = " + req.params.id_profesional;


	console.log(query);
	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/turnos-reporte/:fechad/:fechah/:id_profesional?/:id_cliente?', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', ID_PROFESIONAL, P.NOMBRE as 'PROFESIONAL', " + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.FECHA between STR_TO_DATE('" + req.params.fechad + "', '%Y-%m-%d') AND  STR_TO_DATE('" + req.params.fechah + "', '%Y-%m-%d')" +
				"    AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL ";

	if (req.params.id_cliente) {
		query += " AND C.ID = " + req.params.id_cliente;
	}

	if (req.params.id_profesional) {
		query += " AND P.ID = " + req.params.id_profesional;
	}

	query += " ORDER BY FECHA, PROFESIONAL, CLIENTE";

	console.log(query);
	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/turno-disponible/:fecha/:inicio/:fin', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', ID_PROFESIONAL, P.NOMBRE as 'PROFESIONAL', " + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.FECHA = STR_TO_DATE('" + req.params.fecha + "', '%Y-%m-%d')" +
				"    AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL";

	if (req.params.id_cliente)
		query += " AND T.ID_CLIENTE = " + req.params.id_cliente;

	if (req.params.id_profesional)
		query += " AND T.ID_PROFESIONAL = " + req.params.id_profesional;


	console.log(query);
	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = err || rows;
		res.json(data)
			.end();

	});

});

app.post('/cerrar-turno', function (req, res) {

	var response = {};
	var importe = req.body.IMPORTE;
	var pago = req.body.PAGO;
	var id = req.body.ID;

	var Turnos = db.define(TurnosDef.name, TurnosDef.model, {
		tableName : TurnosDef.name,
		timestamps : false
	});

	Turnos.find({ where : { ID : id }})
		.then(function (data) {

			var response = {};
			if (data) {

				if (data.IMPORTE == 0 && data.PAGO == 0) {

					Turnos.update({
						IMPORTE : importe,
						PAGO : pago
					}, { where : { ID : id }})
					.then(function (data) {

						if (data.dataValues)
							response = data.dataValues;
						else
							response = data;

						res.json(response)
							.end();

					});

				} else {

					response.err = 'El turno con ID ' + id + ' ya se encuentra cerrado.';

					res.json(response)
						.end();

				}

			} else {

				response.err = 'ID ' + id + ' Inexsistente.';

				res.json(response)
					.end();

			}

		});


});

module.exports = app;