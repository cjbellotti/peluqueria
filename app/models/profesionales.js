var Sequelize = require('sequelize');

var model = {};
model.name = 'PROFESIONALES';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	NOMBRE : Sequelize.STRING(50),
	DESCRIPCION : Sequelize.STRING(140)
};

module.exports = model;