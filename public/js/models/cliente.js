App.Models.Cliente = Backbone.Model.extend({

	idAttribute : 'ID',
	url : function () {

		var url = '/clientes'
		var id = this.get('ID');
		if (id)
			url += '/' + id;

		console.log(url);
		return url;

	}

});