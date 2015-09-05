App.Router = Backbone.Router.extend({

  routes : {

    '' : 'main',
    'login' : 'login',
    'Customers' : 'customersList'

  },

  main : function () {

    var view = new App.Views.Main();
    $('#main').html(view.el);
    view.render();

  },

  customersList : function () {

    var view = new App.Views.Customers();
    $('.content').html(view.el);
    view.renderList();

  },

  profesionalsList : function () {

    var view = new App.Views.Customers();
    $('#main').html(view.el);
    view.renderList();

  },

  login : function () {

    var view = new App.Views.Login();
    $('#main').html(view.el);
    view.render();

  }

});
