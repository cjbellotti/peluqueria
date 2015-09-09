var db = require('./db');
var _ = require('underscore');

var verifNumber = /^([0-9]+)$/g;
var verifData = /\d{2}-\d{2}-\d{4}/g;
var verifString = /(\w|\D)+/g;

module.exports = function (tableName) {

	var app = require('express')();
	var selectQuery = 'SELECT * FROM ' + tableName;
	var insertQuery = 'INSERT INTO ' + tableName;
	var updateQuery = 'UPDATE ' + tableName + ' SET ';
	var deleteQuery = 'DELETE FROM ' + tableName + ' WHERE ID = ';

	var url = '/' + tableName;
	app.get(url + '/:id?', function (req, res) {

		var query = selectQuery;

		if (req.params.id)
			query += ' where ID = ' + req.params.id;

		db.query(query, function (err, rows) {

			var data = err || rows;
			if (!err && req.params.id)
				data = data[0];
			res.json(data)
				.end();

		});

	});

	app.post(url, function (req, res) {

		var query = insertQuery + ' (' + _.keys(req.body).join(',') + ') values (';
		var values = _.values(req.body);

		for (var index in values) {

			if (/\d{4}-\d{2}-\d{2}/g.exec(values[index]))
				values[index] = "STR_TO_DATE('" + values[index] + "', '%Y-%m-%d')";
			else if (/\d:\d/g.exec(values[index]))
				values[index] = "TIME('" + values[index] + "')";
			else if (/(^\d+$)|(^\d+\.\d+$)/g.test(values[index]))
				values[index] = values[index];
			else if (/\w+|\s*/g.exec(values[index]))
				values[index] = "'" + values[index] + "'";

		}

		query += values.join(',') + ')';

		console.log(query);
		db.query(query, function (err, rows) {

			var data = err || rows;
			res.json(data)
				.end();

		});

	});

	app.put(url + '/:id' , function (req, res) {

		var query = updateQuery;
		var data = req.body;
		var changes = [];
		for (var field in data) {

			if (field != 'ID') {

				if (/\d{4}-\d{2}-\d{2}/g.exec(data[field]))
					data[field] = "STR_TO_DATE('" + data[field] + "', '%Y-%m-%d')";
				else if (/\d:\d/g.exec(data[field]))
					data[field] = "TIME('" + data[field] + "')";
				else if (/^\d+$/g.test(data[field]))
					data[field] = data[field];
				else if (/\w+/g.exec(data[field]))
					data[field] = "'" + data[field] + "'";

				changes.push (field + ' = ' + data[field]);

			}

		}

		query += changes.join(',') + ' WHERE ID = ' + req.params.id;

		console.log(query);
		db.query(query, function (err, rows) {

			var data = err || rows;
			res.json(data)
				.end();

		});

	});

	app.delete(url + '/:id' , function (req, res) {

		var query = deleteQuery + req.params.id;

		console.log(query);
		db.query(query, function (err, rows) {

			var data = err || rows;
			res.json(data)
				.end();

		});

	});

	return app;
}