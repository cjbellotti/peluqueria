var Sequelize = require('sequelize');

var model = {};
model.name = 'PAGOS';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	FECHA : Sequelize.DATE,
	ID_CLIENTE : Sequelize.INTEGER,
	ID_TURNO : Sequelize.INTEGER,
	DESCRIPCION : Sequelize.STRING(140),
	IMPORTE : Sequelize.DECIMAL
};

module.exports = model;