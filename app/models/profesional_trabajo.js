var Sequelize = require('sequelize');

var model = {};
model.name = 'PROFESIONAL_TRABAJO';
model.model = {
	ID : {
		type : Sequelize.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	ID_PROFESIONAL : Sequelize.INTEGER,
	ID_TRABAJO : Sequelize.INTEGER
};

module.exports = model;