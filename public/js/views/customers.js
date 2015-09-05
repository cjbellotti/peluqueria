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
    "click #ok" : "guardar"
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
    this.model.save();

    if (this.callback)
      this.callback();

    this.$el.modal('hide');

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
    this.$el.css('z-index', '1060');

    this.$el.html(this.formTemplate(data));

    var self = this;
    this.$el.on('hidden.bs.modal', function () {
        self.$el.remove();
    });

  }

});
