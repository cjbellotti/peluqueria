App.Views.Dialog = Backbone.View.extend({
	
	initialize : function (config) {

		this.data = {};
		this.data.titulo = config.titulo;
		this.data.texto = config.texto;
		this.onok = config.onok;
		this.template = swig.compile(getTemplate('templates/dialog.html'));

	},

	render : function () {

	    this.$el.addClass('modal');
	    this.$el.addClass('fade');
	    this.$el.attr('aria-hidden', 'true');
	    this.$el.css('z-index', ++window.zorder);

	    this.$el.html(this.template(this.data));

	    var self = this;
	    this.$el.on('hidden.bs.modal', function () {
	        self.$el.remove();
	        if (self.onok)
				self.onok();
	        window.zorder--;
	    });

	}

});