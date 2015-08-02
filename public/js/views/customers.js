App.Views.Customers = Backbone.View.extend({

  initialize : function () {

    this.listTemplate = swig.compile(getTemplate('templates/customers-list.html'));

  }, 

  render : function () {

    $('.caption').html('Clientes');
    this.$el.html(this.listTemplate());

  }

});
