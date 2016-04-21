var Article = Backbone.Model.extend({
	defaults: {
		text: '',
		author: 'неизвестный автор',
		creator: 'аноним',
		liked: []
	},

	initialize: function() {
		this.calcRating();

		if (!this.get('theDate')) {
			var date = new Date();
			this.set({'theDate': date});
			this.set({'theDateString': this.getDateString(date)});
		}
	},

	getDateString: function(date) {
		var day, month, year;
		day = ('0' + date.getDate()).slice(-2);
		month = ('0' + (date.getMonth() + 1)).slice(-2);
		year = date.getFullYear();
		return (day + '-' + month + '-' + year);
	},

	calcRating: function() {
		this.set('rating', this.get('liked').length);
	},

	clear: function() {
		this.destroy();
	}
});