App.Views.Turno = Backbone.View.extend({

	initialize : function (config) {

		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/turno.html'));

	},

	events : {
		"click #ok" : "ok"
	},

	ok : function () {

		if (this.onok)
			this.onok(this.model, this);
		this.$el.modal('hide');

	},

	render : function (turno) {

	    var self = this;
	    this.model = new App.Models.Turno(turno);
	    this.$el.addClass('modal');
	    this.$el.addClass('fade');
	    this.$el.attr('aria-hidden', 'true');
	    this.$el.css('z-index', '1061');

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
								'10:00',
								'10:15',
								'10:30',
								'10:45',
								'11:00',
								'11:15',
								'11:30',
								'11:45',
								'12:00',
								'12:15',
								'12:30',
								'12:45',
								'13:00',
								'13:15',
								'13:30',
								'13:45',
								'14:00',
								'14:15',
								'14:30',
								'14:45',
								'15:00',
								'15:15',
								'15:30',
								'15:45',
								'16:00',
								'16:15',
								'16:30',
								'16:45',
								'17:00',
								'17:15',
								'17:30',
								'17:45',
								'18:00',
								'18:15',
								'18:30',
								'18:45',
								'19:00',
								'19:15',
								'19:30',
								'19:45',
								'20:00',
								'20:15',
								'20:30',
								'20:45',
								'21:00',
								'21:15',
								'21:30',
								'21:45'	    	
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

	    			}

	    		});

	    	}
	    });

	    this.$el.on('hidden.bs.modal', function () {
	        self.$el.remove();
	    });

	}
});