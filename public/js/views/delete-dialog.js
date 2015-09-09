App.Views.DeleteDialog = Backbone.View.extend({
	
	initialize : function (config) {

		this.data = {};
		this.data.titulo = config.titulo;
		this.data.texto = config.texto;
		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/delete-dialog.html'));

	},

	events : {

		'click #ok' : 'delete'

	},

	delete : function () {

		if (this.onok)
			this.onok();
	},

	render : function () {

	    this.$el.addClass('modal');
	    this.$el.addClass('fade');
	    this.$el.attr('aria-hidden', 'true');
	    this.$el.css('z-index', '2000');

	    this.$el.html(this.template(this.data));

	    var self = this;
	    this.$el.on('hidden.bs.modal', function () {
	        self.$el.remove();
	    });

	}

});