App.Views.Customers = Backbone.View.extend({

  initialize : function () {

    this.listTemplate = swig.compile(getTemplate('templates/customers-list.html'));
    this.formTemplate = swig.compile(getTemplate('templates/customers-form.html'));
    this.dataTemplate = swig.compile(getTemplate('templates/customers-data.html'));

  }, 

  events : {

    "keyup #find" : "find",
    "click #add-customer" : "addCustomer"

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

    var view = new App.Views.Customers();
    $('#modals').html(view.el);
    view.renderForm();
    view.$el.modal({
       backdrop : 'static',
       keyboard : false
    });

  },

  render : function () {

    $('.caption').html('Clientes');
    this.$el.html(this.listTemplate());

  },

  renderForm : function () {

    this.$el.addClass('modal');
    this.$el.addClass('fade');
    this.$el.attr('aria-hidden', 'true');
    this.$el.css('z-index', '1060');

    this.$el.html(this.formTemplate());
    this.$el.find('.customers-form-content').html(this.dataTemplate());

    var self = this;
    this.$el.on('hidden.bs.modal', function () {
        self.$el.remove();
    });

    this.$el.on('shown.bs.modal', function () {
        console.log('Show!!!');
        self.$el.find('#nombre').focus();
    });
  }

});
