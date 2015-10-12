App.Views.Pagos = Backbone.View.extend({
	
	initialize : function () {
		
		this.template = swig.compile(getTemplate('templates/pagos.html'));
		this.data = {};
		var clientes = new App.Collections.Clientes();
		clientes.fetch({async : false});
		
		this.data.clientes = clientes.toJSON();
		this.data.desde = new Date().toJSON().substring(0,10);
		this.data.hasta = new Date().toJSON().substring(0,10);
		
	},
	
	events : {
	
		"change #desde" : "cargarPagos",
		"change #hasta" : "cargarPagos",
		"change #profesional" : "cargarPagos",
		"change #cliente" : "cargarPagos",
		"click #pago-nuevo" : "pagoNuevo"
		
	},
	
	cargarPagos : function () {
		
		var self = this;
		this.data.desde = this.$el.find('#desde').val();
		this.data.hasta = this.$el.find('#hasta').val();
		this.data.cliente = this.$el.find('#cliente').val();

		this.obtenerDatos(function () {
			self.render();
		});
		
	},
	
	obtenerDatos : function (callback) {
		
		var self = this;
		
		var url = '/pagos-reporte/' + this.data.desde + '/' + this.data.hasta;
		if (this.data.cliente && this.data.cliente != '*')
			url += '/' + this.data.cliente;
		
		$.get(url, function (pagos) {
			
			self.data.pagos = pagos;
			self.data.total_importe = 0;
			for (var index in pagos) {
				self.data.total_importe += pagos[index].IMPORTE;
			}
			if(callback)
				callback();
			
		});

	},

	pagoNuevo : function (e) {

	    var self = this;
	    var view = new App.Views.Pago({

			onok : function (pago, scope) {

				var model = new App.Models.Pago();
				var fecha = scope.$el.find('#fecha').val();
				var cliente = scope.$el.find('#cliente').val();
				var importe = scope.$el.find('#importe').val() || 0;
				var descripcion = scope.$el.find('#descripcion').val();
				if (descripcion.length = 0)
					descripcion = ' ';

				if (pago) {

					model.set('ID', pago.get('ID'));

				}

				model.set('FECHA', fecha);
				model.set('ID_CLIENTE', cliente);
				model.set('IMPORTE', parseFloat(importe));
				model.set('DESCRIPCION', descripcion);

				model.save({}, {

					success : function () {

						self.render();

					}

				});

			}

	    });

	    $('#modals').html(view.el);
	    view.render({});
	    view.$el.modal({
	       backdrop : 'static',
	       keyboard : false
	    });

	},
	
	render : function () {
		
		var self = this;
		$('.caption').html('Pagos');

		this.obtenerDatos(function () {

			self.$el.html(self.template(self.data));

			if (self.data.cliente) {
				self.$el.find('#cliente').val(self.data.cliente);			
			}
		
		});
	}
	
});