var app = require('../../lib/crud')(require('../models/permisos'));
var db = require('../../lib/db');

app.get('/permisos-by-user/:user', function (req, res) {

	if (req.session.name == req.params.user) {

		db.models.PERMISOS.findAll({ where : { USER_ID : req.params.user}})
			.then(function (data) {

				var response = {};
				if (data)
					response = data;
				else
					response.err = 'Usuario ' + req.params.user + ' invalido.';

				res.json(response)
					.end();

			});

	} else {

		res.redirect('/#login');

	}

});

module.exports = app;