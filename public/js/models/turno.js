App.Models.Turno = Backbone.Model.extend({

	idAttribute : 'ID',
	url : function () {

		var url = '/TURNOS'
		var id = this.get('ID');
		if (id)
			url += '/' + id;

		console.log(url);
		return url;

	}

});