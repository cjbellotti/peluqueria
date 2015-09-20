App.Models.Trabajos = Backbone.Model.extend({

	idAttribute : 'ID',
	url : function () {

		var url = '/TRABAJOS'
		var id = this.get('ID');
		if (id)
			url += '/' + id;

		console.log(url);
		return url;

	}

});