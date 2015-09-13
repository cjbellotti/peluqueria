App.Views.Reporte = Backbone.View.extend({
	
	initialize : function () {
		
		this.template = swig.compile(getTemplate('templates/reporte.html'));
		this.data = {};
		var profesionales = new App.Collections.Profesionales();
		var clientes = new App.Collections.Clientes();
		profesionales.fetch({ async : false });
		clientes.fetch({async : false});
		
		this.data.profesionales = profesionales.toJSON();
		this.data.clientes = clientes.toJSON();
		this.data.desde = new Date().toJSON().substring(0,10);
		this.data.hasta = new Date().toJSON().substring(0,10);
		
	},
	
	events : {
	
		"change #desde" : "cargarReporte",
		"change #hasta" : "cargarReporte",
		"change #profesional" : "cargarReporte",
		"change #cliente" : "cargarReporte",
		
	},
	
	cargarReporte : function () {
		
		var self = this;
		this.data.desde = this.$el.find('#desde').val();
		this.data.hasta = this.$el.find('#hasta').val();
		this.data.profesional = this.$el.find('#profesional').val();
		this.data.cliente = this.$el.find('#cliente').val();

		this.obtenerDatos(function () {
			self.render();
		});
		
	},
	
	obtenerDatos : function (callback) {
		
		var self = this;
		
		var url = '/turnos-reporte/' + this.data.desde + '/' + this.data.hasta;
		if (this.data.profesional && this.data.profesional != '*')
			url += '/' + this.data.profesional;
		if (this.data.cliente && this.data.cliente != '*')
			url += '/' + this.data.cliente;
		
		$.get(url, function (turnos) {
			
			self.data.turnos = turnos;
			self.data.total_importe = 0;
			self.data.total_pago = 0;
			for (var index in turnos) {
				self.data.total_importe += turnos[index].IMPORTE;
				self.data.total_pago += turnos[index].PAGO;
			}
			if(callback)
				callback();
			
		});

	},
	
	render : function () {
		
		var self = this;
		$('.caption').html('Reporte');

		this.obtenerDatos(function () {

			self.$el.html(self.template(self.data));

			if (self.data.profesional) {
				self.$el.find('#profesional').val(self.data.profesional);			
			}
			if (self.data.cliente) {
				self.$el.find('#cliente').val(self.data.cliente);			
			}
		
		});
	}
	
});