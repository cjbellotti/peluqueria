var Sequelize = require('sequelize');

var model = {};
model.name = 'CLIENTES';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	NOMBRE : Sequelize.STRING(30),
	APELLIDO : Sequelize.STRING(30),
	EMAIL : Sequelize.STRING(50),
	TELEFONO : Sequelize.STRING(20),
	DIRECCION : Sequelize.STRING(140),
	FECHA_NACIMIENTO : Sequelize.DATE(),
	DESCRIPCION : Sequelize.STRING(140)
};

module.exports = model;