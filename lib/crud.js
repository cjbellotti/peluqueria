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
			
			Model.find({})
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

	return app;

}