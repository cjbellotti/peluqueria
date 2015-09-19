var Sequelize = require('sequelize');

var model = {};
model.name = 'CLIENTES';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	NOMBRE : Sequelize.STRING(50),
};

module.exports = model;