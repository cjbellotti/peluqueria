var Sequelizer = require('sequelize');
var config = require('./config.json');

console.log (config);

var sequelizer = new Sequelizer(config.database, config.user, config.pass, {
	dialect : 'mysql',
	port : 3306
});

sequelizer
	.authenticate()
	.then(function (err) {
		console.log ('Conexion a la base %s exitosa.', config.database);
	}, function (err) {
		console.log('Imposible conectarse a la base %s.', config.database);
	});

module.exports = sequelizer;