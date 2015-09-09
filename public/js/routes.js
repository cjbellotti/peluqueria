App.Router = Backbone.Router.extend({

  routes : {

    'main' : 'main',
    '' : 'login',
    'Customers' : 'customersList'

  },

  main : function () {

    if (window.session) {

      var view = new App.Views.Main();
      $('#main').html(view.el);
      view.render();

    } else {

      window.location = '/';
      
    }

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

    if (window.session) {

      window.location = '/#main';

    } else {

      var view = new App.Views.Login();
      $('#main').html(view.el);
      view.render();

    }

  }

});
