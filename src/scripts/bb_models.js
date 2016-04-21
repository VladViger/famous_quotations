var Article = Backbone.Model.extend({
	defaults: {
		text: '',
		author: 'неизвестный автор',
		creator: 'аноним',
		liked: []
	},

	initialize: function() {
		if (!this.get('theDate')) {
			this.set({'theDate': this.getDateString()});
		}
	},

	getDateString: function() {
		var date, day, month, year;
		date = new Date();
		day = ('0' + date.getDate()).slice(-2);
		month = ('0' + (date.getMonth() + 1)).slice(-2);
		year = date.getFullYear();
		return (day + '-' + month + '-' + year);
	},

	getRating: function() {
		return this.get('liked').length;
	}
});