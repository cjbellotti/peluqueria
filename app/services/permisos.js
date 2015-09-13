var app = require('../../lib/crud')('permisos');
var db = require('../../lib/db');

app.get('/permisos-by-user/:user', function (req, res) {

	if (req.session.name == req.params.user) {

		var query = "SELECT * FROM PERMISOS WHERE USER_ID = '" + req.params.user + "'";

		db.query(query, function (err, rows) {

			var data = err || rows;
			if (!err && req.params.id)
				data = data[0];
			res.json(data)
				.end();

		});

	} else {

		res.redirect('/#login');

	}

});

module.exports = app;