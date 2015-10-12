App.Models.Pago = Backbone.Model.extend({

	idAttribute : 'ID',
	url : function () {

		var url = '/PAGOS'
		var id = this.get('ID');
		if (id)
			url += '/' + id;

		console.log(url);
		return url;

	}

});