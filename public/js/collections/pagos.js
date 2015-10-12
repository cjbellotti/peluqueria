App.Collections.Pagos = Backbone.Collection.extend({
	
	model : App.Models.Pago,
	fetch : function () {

		var self = this;
		$.get('/PAGOS', function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

		});

	},

	fetchByCliente : function (id, callback) {

		var self = this;
		$.get('/pagos-by-cliente/' + id, function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

			if(callback)
				callback();

		});

	},

	fetchByFecha : function (fecha, callback) {

		var url = '/pagos-by-fecha/' + fecha;
		var self = this;
		$.get(url, function(data) {

			_.each(data, function (turno) {

				self.add(turno);

			});

			if(callback)
				callback();

		});

	},

});