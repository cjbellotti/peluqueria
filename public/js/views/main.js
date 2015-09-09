App.Views.Main = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/main-v2.html'));

  },

  events : {

    "click .application" : "runApplication"

  },

  runApplication : function (e) {

    e.preventDefault();
    e.stopPropagation();
    var url = e.target.href;
    var viewName = url.substring(url.indexOf('#') + 1);

    this.execute(viewName);

  },

  execute : function (viewName) {

    var view = new App.Views[viewName]();

    this.$el.find('.content').html(view.el);
    view.render();

  },

  render : function () {

    var data = { 
      applications : [
        {
          title : 'Clientes',
          url : 'Customers'
        },
        {
          title : 'Profesionales',
          url : 'Profesionals'
        },
        // {
        //   title : 'Trabajos',
        //   url : 'Tasks'
        // },
        {
          title : 'Turnos',
          url : 'Turnos'
        },
		{
		  title : 'Reporte',
		  url : 'Reporte'
		}
      ]

    };
    this.$el.html(this.template(data));
    this.execute(data.applications[0].url);

  }

});
