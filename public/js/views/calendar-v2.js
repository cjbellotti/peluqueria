App.Views.Calendar = Backbone.View.extend({

	initialize : function (config) {

		this.config = config;
		this.template = swig.compile(getTemplate('templates/calendar-v2.html'));
		this.turnoTemplate = swig.compile(getTemplate('templates/turno.html'));
		this.turnoBox = swig.compile(getTemplate('templates/turno-box.html'));
		this.turnoTooltipTemplate = swig.compile(getTemplate('templates/turno-tooltip.html'));

	},

	events : {

		"click .turno" : "turno",
		"click #ok" : "ok",
		"change .fecha" : "cargarTurnos",
		"mouseenter .turno-box" : "turnoTooltip",
		"mouseleave .turno-box" : "cerrarTurnoTooptip"
	},

	turno : function (e) {

		var self = this;
		console.log ($(e.target).attr('hs'));
		console.log ($(e.target).attr('id-profesional'));

		var fecha = this.$el.find('.fecha').val();
		var inicio = $(e.target).attr('hs');
		var profesional = $(e.target).attr('id-profesional');
		var id_turno = $(e.target).attr('id-turno');

		var modelo_turno = new App.Models.Turno();

		if (id_turno ) {

			id_turno = parseInt(id_turno);
			modelo_turno.set('ID', id_turno);
			modelo_turno.fetch({
				async : false				
			});

		} 

		var turno = modelo_turno.toJSON();

		if (!turno.ID) {

			turno = {

				FECHA : fecha,
				ID_PROFESIONAL : profesional,
				HORA_INI : inicio,
				HORA_FIN : inicio

			}

		} else {

			turno.FECHA = turno.FECHA.substring(0, 10);
			turno.HORA_INI = turno.HORA_INI.replace(/(\d+):(\d+):(\d+)/g, '$1$2');
			turno.HORA_FIN = turno.HORA_FIN.replace(/(\d+):(\d+):(\d+)/g, '$1$2');

		}

		var view = new App.Views.Turno({

			onok : function (turno, scope) {

				var model = new App.Models.Turno();
				var fecha = scope.$el.find('#fecha').val();
				var inicio = scope.$el.find('#inicio').val().replace(/(\d{2})(\d{2})/g, '$1:$2');
				var fin = scope.$el.find('#fin').val().replace(/(\d{2})(\d{2})/g, '$1:$2');
				var cliente = scope.$el.find('#cliente').val();
				var profesional = scope.$el.find('#profesional').val();
				var importe = scope.$el.find('#importe').val() || 0;
				var pago = scope.$el.find('#pago').val() || 0;
				var descripcion = scope.$el.find('#descripcion').val();
				if (descripcion.length = 0)
					descripcion = ' ';

				if (turno) {

					model.set('ID', turno.get('ID'));

				}

				model.set('FECHA', fecha);
				model.set('HORA_INI', inicio);
				model.set('HORA_FIN', fin);
				model.set('ID_CLIENTE', cliente);
				model.set('ID_PROFESIONAL', profesional);
				model.set('IMPORTE', parseFloat(importe));
				model.set('PAGO', parseFloat(pago));
				model.set('DESCRIPCION', descripcion);

				model.save({}, {

					success : function () {

						self.cargarTurnos();

					}

				});

			}

		});

		$('#modals').append(view.el);
		view.render(turno);
		view.$el.modal('show');

	},	

	ok : function (e) {

		if (this.config.onok)
			this.config.onok();
		this.$el.modal('hide');

	},

	cargarTurnos : function (e) {

		console.log('Cargar Turnos!!!');
		var self = this;
		var turnos = new App.Collections.Turnos();
		var fecha = this.$el.find('.fecha').val();
		turnos.fetchByFecha(fecha, function () {

			self.config.data.fecha = fecha;
			self.render();
			var data = turnos.toJSON();
			for (var index in data) {
				var turno = data[index];
				turno.HORA_INI = turno.HORA_INI.replace(/(\d+):(\d+):(\d+)/g,"$1$2");
				turno.HORA_FIN = turno.HORA_FIN.replace(/(\d+):(\d+):(\d+)/g,"$1$2");
				self.addTurno(turno);
			}

		});

	},

	turnoTooltip : function (e) {

		if ($('.turno-tooltip').length > 0)
			$('.turno-tooltip').remove();

		var self = this;
		var idTurno = $(e.target).attr('id-turno');
		if (idTurno) {

			$.get('/turno-by-id/' + idTurno, function (data) {

				var tooltip = $(self.turnoTooltipTemplate(data));
				var offset = $(e.target).offset();
				var ventana = $(window);
  				//var x = (e.pageX - offset.left);
  				//var y = (e.pageY - offset.top);
  				var x = (e.pageX);
  				var y = (e.pageY);

  				if (x + 400 > ventana.width())
  					x -= 400;

  				tooltip.css('left', x);
  				tooltip.css('top', y);
				$('#modals').append(tooltip);

			});
		}
	},

	cerrarTurnoTooptip : function (e) {

		$('.turno-tooltip').remove();

	},

	render : function () {

		this.$el.html(this.template(this.config.data));
		var header = this.$el.find('.mc-profesionales');
		var ancho = header.width() - 8 - 45;
		var cantProfesionales = this.$el.find('.cell-header').length - 1;
		var anchoHeader = ancho / cantProfesionales;
		this.$el.find('.profesional-header').width(anchoHeader);
		this.$el.find('.turno').width(anchoHeader);

		this.colores = {};

		var color_index = 0;
		for (var index in this.config.data.profesionales) 
			this.colores[this.config.data.profesionales[index].ID] = 'cell-' + ++color_index;

	},

	addTurno : function (turno) {

		var inicio = turno.HORA_INI;
		var fin = turno.HORA_FIN;
		var box = $(this.turnoBox(turno));
		var width = this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).width();
		var height = this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).height();
		var cant = this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).length + 1;
		box.width(width);
		box.height(height * cant);
		box.attr('id-turno', turno.ID);
		box.find('*').attr('id-turno', turno.ID);

		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).attr('id-turno', turno.ID);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).html(box);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).addClass('hs-ini-turno');
		//this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == fin }).addClass('hs-fin-turno');
		//this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == fin }).attr('id-turno', turno.ID);
		if (this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).length == 0) {
			this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).addClass('hs-ini-turno').addClass('hs-fin-turno');
			this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).css('border-top', '1px solid');
		} else {
			this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).last().addClass('hs-fin-turno');
			this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).last().attr('id-turno', turno.ID);		
		}
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).addClass('hs-body-turno');
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).attr('id-turno', turno.ID);

		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == inicio }).addClass(this.colores[turno.ID_PROFESIONAL]);
		//this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == fin }).addClass(this.colores[turno.ID_PROFESIONAL]);
		//this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') == fin }).addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).last().addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).last().addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).addClass(this.colores[turno.ID_PROFESIONAL]);
		this.$el.find("div[id-profesional='" + turno.ID_PROFESIONAL + "']").filter(function (index) { return $(this).attr('hs') > inicio && $(this).attr('hs') < fin }).addClass(this.colores[turno.ID_PROFESIONAL]);



	}

});