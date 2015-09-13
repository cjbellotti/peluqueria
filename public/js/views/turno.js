App.Views.Turno = Backbone.View.extend({

	initialize : function (config) {

		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/turno.html'));

	},

	events : {
		"click #ok" : "ok",
		"click #eliminar" : "eliminar",
		"click #cliente-nuevo" : "clienteNuevo"
	},

	ok : function () {

		if (this.onok)
			this.onok(this.model, this);
		this.$el.modal('hide');

	},

	eliminar : function (e) {

		var self = this;

	    var view = new App.Views.DeleteDialog({

	      titulo : 'Eliminar Turno',
	      texto : '¿Desea eliminar este turno?',
	      onok : function () {

	        self.model.destroy();
	        self.$el.modal('hide');
	        $('.fecha').trigger('change');

	      }

	    });

	    $('#modals').append(view.el);
	    view.render();
	    view.$el.modal('show');


	},

	clienteNuevo : function () {
	
		var self = this;
		var view = new App.Views.Customers({
		  callback : function (model) {
			var clientesCombo = self.$el.find('#cliente');
			clientesCombo.html('');
			var clientes = new App.Collections.Clientes();
			clientes.fetch({
				success : function (data) {
					
					var lista = data.toJSON();
					for (var index in lista) {
						var cliente = lista[index];
						clientesCombo.append('<option value="' + cliente.ID + '">' + cliente.NOMBRE + ' ' + cliente.APELLIDO + '</option>');
					}
					
				}
				
			});
			
		  }
		});

		$('#modals').append(view.el);
		view.renderForm();
		view.$el.modal({
		   backdrop : 'static',
		   keyboard : false
		});

	},
	
	render : function (turno) {

	    var self = this;
	    this.model = new App.Models.Turno(turno);
	    this.$el.addClass('modal');
	    this.$el.addClass('fade');
	    this.$el.attr('aria-hidden', 'true');
	    this.$el.css('z-index', ++window.zorder);

	    var profesionales = new App.Collections.Profesionales();
	    profesionales.fetch({

	    	success : function (profesionales) {

	    		var clientes = new App.Collections.Clientes();
	    		clientes.fetch ({
	    			success : function (clientes) {

					    self.$el.html(self.template({
					    	fecha : new Date(),
					    	datos : turno,
					    	profesionales : profesionales.toJSON(),
					    	clientes : clientes.toJSON(),
					    	hhs : [
								'09:00',
								'09:30',
								'10:00',
								'10:30',
								'11:00',
								'11:30',
								'12:00',
								'12:30',
								'13:00',
								'13:30',
								'14:00',
								'14:30',
								'15:00',
								'15:30',
								'16:00',
								'16:30',
								'17:00',
								'17:30',
								'18:00',
								'18:30',
								'19:00',
								'19:30',
								'20:00',
								'20:30',
								'21:00',
								'21:30',
								'22:00'	    	
							]
					    }));
						if (turno) {

							if (turno.ID_CLIENTE)
								self.$el.find('#cliente').val(turno.ID_CLIENTE);
							if (turno.ID_PROFESIONAL)
								self.$el.find('#profesional').val(turno.ID_PROFESIONAL);

							self.$el.find('#fecha').val(turno.FECHA);
							self.$el.find('#inicio').val(turno.HORA_INI);
							self.$el.find('#fin').val(turno.HORA_FIN);

						}

						if (!turno.ID)
							self.$el.find('#eliminar').prop('disabled', 'true');

	    			}

	    		});

	    	}
	    });

	    this.$el.on('hidden.bs.modal', function () {
	        self.$el.remove();
	        window.zorder--;
	    });

	}
});