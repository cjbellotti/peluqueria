App.Views.Login = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/login.html'));

  },
  
  render : function () {

    this.$el.html(this.template());
    this.$el.find('#user').focus();

  }

});
