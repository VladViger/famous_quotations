var Article = Backbone.Model.extend({
	defaults: {
		rating: 0,
		liked: false,
		rights: false,
		text: '',
		author: 'неизвестный автор',
		creator: 'аноним'
	},

	initialize: function() {
		this.set({
			theDate: this.getDateString()
		})
	},

	getDateString: function() {
		var date, day, month, year;

		date = new Date();
		day = ('0' + date.getDate()).slice(-2);
		month = ('0' + (date.getMonth() + 1)).slice(-2);
		year = date.getFullYear();

		return (day + '-' + month + '-' + year);
	}
});