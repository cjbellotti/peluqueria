var db = require('./db');
var _ = require('underscore');

var verifNumber = /^([0-9]+)$/g;
var verifData = /\d{2}-\d{2}-\d{4}/g;
var verifString = /(\w|\D)+/g;

module.exports = function (tableName) {

	var app = require('express')();
	var selectQuery = 'SELECT * FROM ' + tableName;
	var insertQuery = 'INSERT INTO ' + tableName;
	var updateQuery = 'UPDATE ' + tableName + ' WHERE ID = ';
	var deleteQuery = 'DELETE FROM ' + tableName + ' WHERE ID =';

	var url = '/' + tableName;
	app.get(url, function (req, res) {

		var query = selectQuery;
		db.query(query, function (err, rows) {

			var data = err || rows;
			res.json(data)
				.end();

		});

	});

	app.post(url, function (req, res) {

		var query = insertQuery + ' (' + _.keys(req.body).join(',') + ') values (';
		var values = _.values(req.body);

		for (var index in values) {

			if (verifData.exec(values[index]))
				values[index] = "STR_TO_DATE('" + values[index] + "', '%d-%m-%Y')";
			else if (verifString.exec(values[index]))
				values[index] = "'" + values[index] + "'";

		}

		query += values.join(',') + ')';

		console.log(query);
		res.json({})
			.end();

	});

	return app;
}