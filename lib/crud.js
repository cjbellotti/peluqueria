var express = require('express');
var db = require('./db');

module.exports = function(model) {

	console.log ('Publicando %s...', model.name);
	console.log (model);
	var Model = db.define(model.name, model.model, {
		tableName : model.name,
		timestamps : false
	});

	var app = express();

	var url = '/' + model.name;

	console.log ('\tPublicando %s...', url);
	app.get(url, function (req, res) {

		console.log(req.session.name);
		if (req.session.name) {
			
			Model.findAll({})
				.then(function (data) {

					var response = {};
					if (data)
						response = data;
					else
						response.err = 'Se ha producido un error.';

					res.json(response)
						.end();

				});
						
		} else {
			
			res.redirect('/');
			
		}

	});

	console.log ('\tPublicando %s...', url + '/:id?');
	app.get(url + '/:id?', function (req, res) {

		console.log(req.session.name);
		if (req.session.name) {
			
			Model.find({ where : { ID : req.params.id }})
				.then(function (data) {

					var response = {};
					if (data)
						response = data.dataValues;
					else
						response.err = 'ID ' + req.params.id + ' Inexsistente.';

					res.json(response)
						.end();

				});
						
		} else {
			
			res.redirect('/');
			
		}

	});

	console.log ('\tPublicando %s...', url);
	app.post(url, function (req, res) {

		Model.create(req.body)
			.then(function (err, data) {

				res.json(data.dataValues)
					.end();
					
			});
	});

	console.log ('\tPublicando %s...', url + '/:id?');
	app.put(url + '/:id?', function (req, res) {

		console.log(req.session.name);
		if (req.session.name) {

			Model.update(req.body, { where : { ID : req.params.id }})
				.then(function (data) {

					res.json(data)
						.end();

				});		

		} else {

			res.redirect('/');

		}

	});

	console.log ('\tPublicando %s...', url + '/:id?');
	app.delete(url + '/:id?', function (req, res) {

		console.log(req.session.name);
		if (req.session.name) {

			Model.destroy({ where : { ID : req.params.id }})
				.then(function (data) {

					res.json(data)
						.end();

				});		

		} else {

			res.redirect('/');

		}

	});

	return app;

}