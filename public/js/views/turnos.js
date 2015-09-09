App.Views.Turnos = Backbone.View.extend({

	initialize : function () {

	},

	render : function () {

    	$('.caption').html('Turnos');
		var self = this;
		var config = {};
		config.data = {};
		config.data.columnas = []
		config.data.columnas.push({ header : '09:00'})
		config.data.columnas.push({ header : '09:15'})
		config.data.columnas.push({ header : '09:30'})
		config.data.columnas.push({ header : '09:45'})
		config.data.columnas.push({ header : '10:00'})
		config.data.columnas.push({ header : '10:15'})
		config.data.columnas.push({ header : '10:30'})
		config.data.columnas.push({ header : '10:45'})
		config.data.columnas.push({ header : '11:00'})
		config.data.columnas.push({ header : '11:15'})
		config.data.columnas.push({ header : '11:30'})
		config.data.columnas.push({ header : '11:45'})
		config.data.columnas.push({ header : '12:00'})
		config.data.columnas.push({ header : '12:15'})
		config.data.columnas.push({ header : '12:30'})
		config.data.columnas.push({ header : '12:45'})
		config.data.columnas.push({ header : '13:00'})
		config.data.columnas.push({ header : '13:15'})
		config.data.columnas.push({ header : '13:30'})
		config.data.columnas.push({ header : '13:45'})
		config.data.columnas.push({ header : '14:00'})
		config.data.columnas.push({ header : '14:15'})
		config.data.columnas.push({ header : '14:30'})
		config.data.columnas.push({ header : '14:45'})
		config.data.columnas.push({ header : '15:00'})
		config.data.columnas.push({ header : '15:15'})
		config.data.columnas.push({ header : '15:30'})
		config.data.columnas.push({ header : '15:45'})
		config.data.columnas.push({ header : '16:00'})
		config.data.columnas.push({ header : '16:15'})
		config.data.columnas.push({ header : '16:30'})
		config.data.columnas.push({ header : '16:45'})
		config.data.columnas.push({ header : '17:00'})
		config.data.columnas.push({ header : '17:15'})
		config.data.columnas.push({ header : '17:30'})
		config.data.columnas.push({ header : '17:45'})
		config.data.columnas.push({ header : '18:00'})
		config.data.columnas.push({ header : '18:15'})
		config.data.columnas.push({ header : '18:30'})
		config.data.columnas.push({ header : '18:45'})
		config.data.columnas.push({ header : '19:00'})
		config.data.columnas.push({ header : '19:15'})
		config.data.columnas.push({ header : '19:30'})
		config.data.columnas.push({ header : '19:45'})
		config.data.columnas.push({ header : '20:00'})
		config.data.columnas.push({ header : '20:15'})
		config.data.columnas.push({ header : '20:30'})
		config.data.columnas.push({ header : '20:45'})
		config.data.columnas.push({ header : '21:00'})
		config.data.columnas.push({ header : '21:15'})
		config.data.columnas.push({ header : '21:30'})
		config.data.columnas.push({ header : '21:45'})
		config.data.columnas.push({ header : '22:00'})
		// config.data.profesionales = []
		// config.data.profesionales.push ( { ID : 1, NOMBRE : 'Pedro'})
		// config.data.profesionales.push ( { ID : 2, NOMBRE : 'Paco'})
		// config.data.profesionales.push ( { ID : 3, NOMBRE : 'Luis'})
		// config.data.profesionales.push ( { ID : 4, NOMBRE : 'Roberto'})
		// config.data.profesionales.push ( { ID : 5, NOMBRE : 'Maria'})
		var profesionales = new App.Collections.Profesionales();
		profesionales.fetch({

			success : function (data){

				config.data.profesionales = data.toJSON();
				config.data.fecha = new Date();
				var view = new App.Views.Calendar(config);
				self.$el.html(view.el);
				view.render();
				view.cargarTurnos();

			}

		});

	}
});