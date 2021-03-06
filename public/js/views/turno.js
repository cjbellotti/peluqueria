App.Views.Turno = Backbone.View.extend({

	initialize : function (config) {

		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/turno.html'));
		this.templateCierre = swig.compile(getTemplate('templates/cerrar-turno.html'));

	},

	events : {
		"click #ok" : "ok",
		"click #eliminar" : "eliminar",
		"click #cliente-nuevo" : "clienteNuevo"
	},

	ok : function () {

		if (this.validar()) {

			if (this.onok)
				this.onok(this.model, this);
			this.$el.modal('hide');

		}

	},

	validar : function () {
		
		var validacion = true;
		var inicio = this.$el.find('#inicio').val();
		var fin = this.$el.find('#fin').val();
		var config = {

			titulo : 'Error de validacion',
			onok : function () {

				this.$el.find('#fin').focus();

			}

		};
		if (inicio == fin) {

			config.texto = 'La hora de inicio y de fin del turno deben ser distintas.';
			validacion = false;

		} else if (inicio > fin) {

			config.texto = 'La hora de fin de turno debe ser mayor a la hora de inicio.';
			validacion = false;

		}

		if (!validacion) {

			var dialog = new App.Views.Dialog(config);
			$('#modals').append(dialog.el);
			dialog.render();
			dialog.$el.modal('show');

		}
		
		return validacion;
		
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