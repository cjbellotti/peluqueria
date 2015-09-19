var Sequelize = require('sequelize');

var model = {};
model.name = 'TURNOS';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	FECHA : Sequelize.DATE,
	ID_CLIENTE : Sequelize.INTEGER,
	ID_PROFESIONAL : Sequelize.INTEGER,
	DESCRIPCION : Sequelize.STRING(140),
	IMPORTE : Sequelize.DECIMAL,
	PAGO : Sequelize.DECIMAL,
	HORA_INI : Sequelize.TIME,
	HORA_FIN : Sequelize.TIME
};

module.exports = model;