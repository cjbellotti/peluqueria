App.Views.Customers = Backbone.View.extend({

  initialize : function (config) {

    config = config || {};
    this.callback = config.callback;
    this.model = config.model;

    this.listTemplate = swig.compile(getTemplate('templates/customers-list.html'));
    this.formTemplate = swig.compile(getTemplate('templates/customers-form.html'));

  }, 

  events : {

    "keyup #find" : "find",
    "click #add-customer" : "addCustomer",
    "click #ver" : "ver",
    "click #modificar" : "modificar",
    "click #eliminar" : "eliminar",
    "click #ok" : "guardar",
	"click #crear-turno" : "crearTurno"
  },

  find : function (e) {

    var list = $('.item-data');
    var find = $(e.target).val();
    find = find.toUpperCase();

    for (var index in list) {

      var element = $(list[index]);
      var content = element.find('h4').html();
      content += element.find('p').html();
      content = content.toUpperCase();
      if (content.indexOf(find) < 0)
        element.hide();
      else
        element.show();

    }

  },

  addCustomer : function (e) {

    var self = this;
    var view = new App.Views.Customers({
      callback : function () {
        self.render();
      }
    });

    $('#modals').html(view.el);
    view.renderForm();
    view.$el.modal({
       backdrop : 'static',
       keyboard : false
    });

  },

  ver : function (e) {

    var self = this;
    var id = $(e.target).attr('id-data')
    this.model = new App.Models.Cliente({ ID : id });
    this.model.fetch({
      success : function (res) {

        var data = res.toJSON();
        var turnos = new App.Collections.Turnos();
        turnos.fetchByCliente(id, function () {

          data.turnos = turnos.toJSON();
          var view = new App.Views.Customers({ 

            model : self.model,
            callback : function () {

              self.render();

            }

          });
          $('#modals').append(view.el);
          view.renderForm(data);
          view.$el.modal('show');

        })

      }

    });

  },

  modificar : function (e) {

    var id = $(e.target).attr('id-data')
    this.model = new App.Models.Cliente({ ID : id });
    this.model.fetch({
      success : function (res) {

        var data = res.toJSON();
        var turnos = new App.Collections.Turnos();
        turnos.fetchByCliente(id, function () {

          data.turnos = turnos.toJSON();
          var view = new App.Views.Customers();
          $('#modals').append(view.el);
          view.renderForm(data);
          view.$el.modal('show');

        });

      }

    });

  },

  eliminar : function (e) {

    var self = this;
    var id = $(e.target).attr('id-data')
    var model = new App.Models.Cliente({ ID : id });
    model.fetch({

      success : function () {

        var view = new App.Views.DeleteDialog({

          titulo : 'Eliminar Cliente',
          texto : 'Desea eliminar a ' + model.get('NOMBRE') + ' ' + model.get('APELLIDO'),
          onok : function () {
            model.destroy();
            self.render();
          }

        });

        $('#modals').append(view.el);
        view.render();
        view.$el.modal('show');

      }

    });

    console.log('ID : %s', id);

  },

  guardar : function () {

    var self = this;
    if (!this.model)
      this.model = new App.Models.Cliente();

    var nombre = this.$el.find('#nombre').val();
    var apellido = this.$el.find('#apellido').val();
    var email = this.$el.find('#email').val();
    var telefono = this.$el.find('#telefono').val();
    var domicilio = this.$el.find('#domicilio').val();
    var fecha_nacimiento = this.$el.find('#fecha-nacimiento').val();
    var descripcion = this.$el.find('#descripcion').val();

    this.model.set('NOMBRE', nombre);
    this.model.set('APELLIDO', apellido);
    this.model.set('EMAIL', email);
    this.model.set('TELEFONO', telefono);
    this.model.set('DIRECCION', domicilio);
    this.model.set('FECHA_NACIMIENTO', fecha_nacimiento);
    this.model.set('DESCRIPCION', descripcion);

    $.get('/clientes-by-nombre/' + nombre + '/' + apellido, function (data) {

      if (data.length == 0) {

        self.model.save();

        if (self.callback)
          self.callback();

        self.$el.modal('hide');

      } else {

        var config = {
          titulo : 'Atencion!!!',
        }

        config.texto = "Ya existe un cliente con el nombre " + nombre + " " + apellido + " con los siguientes datos: <br/><br/>"
        for (var field in data[0]) {

          if (field != 'ID')
            config.texto += field + " : " + ((field == 'FECHA_NACIMIENTO') ? data[0][field].substring(0,10) : data[0][field]) + '<br/>';

        }
        config.texto += "<br/>Desde guardarlo de todas formas?";

        config.onok = function () {

          self.model.save();

          if (self.callback)
            self.callback();

          self.$el.modal('hide');

        }

        var dialog = new App.Views.Dialog(config);
        $('#modals').append(dialog.el);
        dialog.render();
        dialog.$el.find('.modal-body').html(config.texto);
        dialog.$el.modal('show');

      }

    });

  },

  crearTurno : function (e) {
	  
	var self = this;

	var fecha = new Date();
	var inicio = '0900';
	
	var turno = {};
	turno.FECHA = fecha.toJSON().substring(0,10);
	turno.HORA_INI = '1000';
	turno.HORA_FIN = '1000';
	turno.ID_CLIENTE = this.model.get('ID');


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

			model.save();

		}

	});

	$('#modals').append(view.el);
	view.render(turno);
	view.$el.modal('show');

  },
  
  render : function () {

    var self = this;
    $('.caption').html('Clientes');
    var clientes = new App.Collections.Clientes();
    clientes.fetch({

      success : function (data) {
        self.$el.html(self.listTemplate({
          clientes : data.toJSON()
        }));

      }

    });

  },

  renderForm : function (data) {

    this.$el.addClass('modal');
    this.$el.addClass('fade');
    this.$el.attr('aria-hidden', 'true');
    this.$el.css('z-index', ++window.zorder);

    this.model = new App.Models.Cliente(data);
    this.$el.html(this.formTemplate(data));
    if (!data)
      this.$el.find('#fecha-nacimiento').attr('value', (new Date()).toISOString().substring(0,10));
    if (!data)
      this.$el.find('#crear-turno').attr('disabled', 'true');
  
    var self = this;
    this.$el.on('hidden.bs.modal', function () {
        self.$el.remove();
        window.zorder--;
    });

  }

});
