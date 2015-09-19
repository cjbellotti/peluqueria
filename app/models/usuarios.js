var Sequelize = require('sequelize');

var model = {};
model.name = 'USUARIOS';
model.model = {
	USER_ID : {
		type : Sequelize.STRING(15),
		primaryKey : true
	},
	USER_PASSWORD : Sequelize.STRING(15),
	NOMBRE : Sequelize.STRING(50)
};

module.exports = model;