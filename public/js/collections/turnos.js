App.Collections.Turnos = Backbone.Collection.extend({
	
	model : App.Models.Turno,
	fetch : function () {

		var self = this;
		$.get('/turnos', function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

		});

	},

	fetchByCliente : function (id, callback) {

		var self = this;
		$.get('/turnos-by-cliente/' + id, function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

			if(callback)
				callback();

		});

	},

	fetchByProfesional : function (id, callback) {

		var self = this;
		$.get('/turnos-by-profesional/' + id, function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

			if(callback)
				callback();

		});

	},

	fetchByFecha : function (fecha) {

		var url = '/turnos-by-profesional/' + fecha;
		var self = this;
		$.get(url, function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

		});

	},

});