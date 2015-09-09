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

  			window.location.href = '/#main';

  			window.session = {};

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
