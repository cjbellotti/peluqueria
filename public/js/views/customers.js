App.Views.Customers = Backbone.View.extend({

  initialize : function () {

    this.listTemplate = swig.compile(getTemplate('templates/customers-list.html'));

  }, 

  renderList : function () {

    this.$el.html(this.listTemplate());

  }

});
