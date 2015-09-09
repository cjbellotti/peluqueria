var app = require('../../lib/crud')('turnos');
var db = require('../../lib/db');

app.get('/turnos-by-cliente/:id_cliente', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', P.NOMBRE as 'PROFESIONAL'," + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.ID_CLIENTE = " + req.params.id_cliente + 
				" AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL"

	db.query(query, function (err, rows) {

		var data = err || rows;
		if (!err && req.params.id)
			data = data[0];
		res.json(data)
			.end();

	});

});

app.get('/turnos-by-profesional/:id_profesional', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', P.NOMBRE as 'PROFESIONAL'," + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.ID_PROFESIONAL = " + req.params.id_profesional + 
				" AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL"

	db.query(query, function (err, rows) {

		var data = err || rows;
		if (!err && req.params.id)
			data = data[0];
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
	db.query(query, function (err, rows) {

		var data = err || rows;
		if (!err && req.params.id)
			data = data[0];
		res.json(data)
			.end();

	});

});

app.get('/turnos-reporte/:fechad/:fechah/:id_cliente?/:id_profesional?', function (req, res) {

	var query = "SELECT T.ID as 'ID', FECHA, HORA_INI, HORA_FIN, ID_CLIENTE, CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS 'CLIENTE', ID_PROFESIONAL, P.NOMBRE as 'PROFESIONAL', " + 
				" T.DESCRIPCION as 'DESCRIPCION', IMPORTE, PAGO" + 
				"  FROM TURNOS AS T, CLIENTES AS C, PROFESIONALES AS P WHERE T.FECHA between STR_TO_DATE('" + req.params.fechad + "', '%Y-%m-%d') AND  STR_TO_DATE('" + req.params.fechah + "', '%Y-%m-%d')" +
				"    AND C.ID = T.ID_CLIENTE AND P.ID = T.ID_PROFESIONAL";

	if (req.params.id_cliente)
		query += " AND T.ID_CLIENTE = " + req.params.id_cliente;

	if (req.params.id_profesional)
		query += " AND T.ID_PROFESIONAL = " + req.params.id_profesional;


	console.log(query);
	db.query(query, function (err, rows) {

		var data = err || rows;
		if (!err && req.params.id)
			data = data[0];
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
	db.query(query, function (err, rows) {

		var data = err || rows;
		if (!err && req.params.id)
			data = data[0];
		res.json(data)
			.end();

	});

});

module.exports = app;