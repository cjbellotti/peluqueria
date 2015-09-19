var Sequelize = require('sequelize');

var model = {};
model.name = 'PERMISOS';
model.model = {
	
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	USER_ID : Sequelize.STRING(15),
	TITLE : Sequelize.STRING(20),
	URL : Sequelize.STRING(140),
	MODULO_CREAR : Sequelize.BOOLEAN,
	MODULO_ELIMINAR : Sequelize.BOOLEAN,
	MODULO_MODIFICAR : Sequelize.BOOLEAN,
	MODULO_CONSULTAR : Sequelize.BOOLEAN

};

module.exports = model;