var PagosDef = require('../models/pagos');
var app = require('../../lib/crud')(PagosDef);
var db = require('../../lib/db');

app.get('/pagos-by-cliente/:id_cliente', function (req, res) {

	var query = "SELECT P.ID as 'ID', FECHA, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE'," + 
				" P.DESCRIPCION as 'DESCRIPCION', IMPORTE" + 
				"  FROM PAGOS AS P, CLIENTES AS C WHERE P.ID_CLIENTE = " + req.params.id_cliente + 
				" AND C.ID = P.ID_CLIENTE"

	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/pago-by-id/:id_pago', function (req, res) {

	var query = "SELECT P.ID as 'ID', FECHA, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', " + 
				" P.DESCRIPCION as 'DESCRIPCION', IMPORTE" + 
				"  FROM PAGOS AS P, CLIENTES AS C WHERE P.ID = " + req.params.id_pago + 
				" AND C.ID = P.ID_CLIENTE"

	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows[0] || {};
		res.json(data)
			.end();

	});

});

app.get('/pagos-by-fecha/:fecha/:id_cliente?', function (req, res) {

	var query = "SELECT P.ID as 'ID', FECHA, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', " + 
				" P.DESCRIPCION as 'DESCRIPCION', IMPORTE" + 
				"  FROM PAGOS AS P, CLIENTES AS C WHERE P.FECHA = STR_TO_DATE('" + req.params.fecha + "', '%Y-%m-%d')" +
				"    AND C.ID = P.ID_CLIENTE";

	if (req.params.id_cliente)
		query += " AND T.ID_CLIENTE = " + req.params.id_cliente;

	console.log(query);
	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

app.get('/pagos-reporte/:fechad/:fechah/:id_cliente?', function (req, res) {

	var query = "SELECT P.ID as 'ID', FECHA, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', " + 
				" P.DESCRIPCION as 'DESCRIPCION', IMPORTE" + 
				"  FROM PAGOS AS P, CLIENTES AS C WHERE P.FECHA between STR_TO_DATE('" + req.params.fechad + "', '%Y-%m-%d') AND  STR_TO_DATE('" + req.params.fechah + "', '%Y-%m-%d')" +
				"    AND C.ID = P.ID_CLIENTE";

	if (req.params.id_cliente) {
		query += " AND C.ID = " + req.params.id_cliente;
	}

	query += " ORDER BY FECHA, CLIENTE";

	console.log(query);
	db.query(query, { type : db.QueryTypes.SELECT })
		.then(function (rows) {

		var data = rows || {};
		res.json(data)
			.end();

	});

});

module.exports = app;