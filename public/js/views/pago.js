App.Views.Pago = Backbone.View.extend({

	initialize : function (config) {

		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/pago.html'));

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
		var config = {

			titulo : 'Error de validacion',
			onok : function () {

				this.$el.find('#fin').focus();

			}

		};

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

	      titulo : 'Eliminar Pago',
	      texto : '¿Desea eliminar este pago?',
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
	
	render : function (pago) {

	    var self = this;
	    this.model = new App.Models.Pago(pago);
	    this.$el.addClass('modal');
	    this.$el.addClass('fade');
	    this.$el.attr('aria-hidden', 'true');
	    this.$el.css('z-index', ++window.zorder);

	    var clientes = new App.Collections.Clientes();
	    clientes.fetch( {

	    	success : function (clientes) {

			    self.$el.html(self.template({
			    	fecha : new Date(),
			    	datos : pago,
			    	clientes : clientes.toJSON()
			    }));

				if (pago) {

					if (pago.ID_CLIENTE)
						self.$el.find('#cliente').val(pago.ID_CLIENTE);

					self.$el.find('#fecha').val(pago.FECHA);

				}

				if (!pago.ID)
					self.$el.find('#eliminar').prop('disabled', 'true');

	    	}
	    });

	    this.$el.on('hidden.bs.modal', function () {
	        self.$el.remove();
	        window.zorder--;
	    });

	}
});