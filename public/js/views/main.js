App.Views.Main = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/main.html'));

  },

  events : {

    "click li" : "runApplication"

  },

  runApplication : function (e) {
    debugger;
  },

  render : function () {

    var data = { 
      applications : [
        {
          title : 'Clientes',
          url : 'customers-list'
        },
        {
          title : 'Profesionales',
          url : 'profesionals-list'
        },
        {
          title : 'Trabajos',
          url : 'tasks-list'
        },
        {
          title : 'Turnos',
          url : 'turns-list'
        }
      ]

    };
    this.$el.html(this.template(data));

  }

});
