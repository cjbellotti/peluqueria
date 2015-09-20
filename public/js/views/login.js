App.Views.Login = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/login.html'));

  },
  
  events : {

  	"click #login" : "login",
  	"keyup #pass" : "enterLogin"

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

          var session = {};

          session.usuario = usuario;
          session.permisos = [];

          for (var index in data)
            session.permisos.push({
              title : data[index].TITLE,
              url : data[index].URL
            });

          window.localStorage.setItem('session', JSON.stringify(session));

          window.location.href = '/#';

        });

  		} else {

  			$('.login-message').css('display', 'block');
  			$('#user').val('');
  			$('#pass').val('');
  			$('#user').focus();
  		}

  	});

  },

  enterLogin : function (e) { 
    if (e.keyCode == 13)
      this.login();
  },
  
  render : function () {

    this.$el.html(this.template());
    this.$el.find('#user').focus();

  }

});
