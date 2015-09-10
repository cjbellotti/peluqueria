App.Views.Login = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/login.html'));

  },
  
  events : {

  	"click #login" : "login"

  },

  login : function () {

  	var usuario = $('#user').val();
  	var clave = $('#pass').val();

  	$.post('/login', {
  		usuario : usuario,
  		clave : clave
  	}, function (data) {

  		if (data.resultado == 'OK') {


  			window.session = {};
        window.session.usuario = usuario;
        $.get('/permisos-by-user/' + usuario, function (data) {


          window.session.permisos = [];

          for (var index in data)
            window.session.permisos.push({
              title : data[index].TITLE,
              url : data[index].URL
            });

          window.location.href = '/#main';

        });

  		} else {

  			$('.login-message').css('display', 'block');
  			$('#user').val('');
  			$('#pass').val('');
  			$('#user').focus();
  		}

  	});

  },

  render : function () {

    this.$el.html(this.template());
    this.$el.find('#user').focus();

  }

});
