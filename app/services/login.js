var app = require('express')();
var db = require('../../lib/db');
var a = require('../../lib/crud')(require('../models/usuarios'));

app.post('/login', function (req, res) {

	db.models.USUARIOS.find({ where : { USER_ID : req.body.usuario, USER_PASSWORD : req.body.clave }})
		.then(function (data) {

			var response = {};
			if (data) {

				response.resultado = 'OK';
				req.session.name = data.USER_ID;

			} else {

				response.resultado = 'ERROR';

			}

			res.json(response)
				.end();

		});

});

app.get('/logout', function (req, res) {

	console.log(req.session);	
	delete req.session['name'];
	
	res.redirect('/');

});

module.exports = app;