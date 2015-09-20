App.Views.Main = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/main-v2.html'));

  },

  events : {

    "click .application" : "runApplication",
    "click #logout" : "logout"

  },

  runApplication : function (e) {

    e.preventDefault();
    e.stopPropagation();
    var url = e.target.href;
    var viewName = url.substring(url.indexOf('#') + 1);

    this.execute(viewName);

  },

  logout : function (e) {

    e.preventDefault();
    e.stopPropagation();
    window.localStorage.removeItem('session');
    $.ajax({
      method : 'GET',
      url : '/logout',
      success : function () {
        window.location.href = '/';
      }
    });

  },

  execute : function (viewName) {

    var view = new App.Views[viewName]();

    this.$el.find('.content').html(view.el);
    view.render();

  },

  render : function () {

    var session = window.localStorage.getItem('session');

    if (!session) {

      window.location.href = '/#login';

    } else { 

      var sessionData = JSON.parse(session);

      var data = { 
        applications : sessionData.permisos
      };

      this.$el.html(this.template(data));
      this.execute(data.applications[0].url);

    }

  }

});
