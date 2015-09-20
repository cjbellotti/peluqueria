App.Models.Profesional = Backbone.Model.extend({

	idAttribute : 'ID',
	url : function () {

		var url = '/PROFESIONALES'
		var id = this.get('ID');
		if (id)
			url += '/' + id;

		return url;

	}

});