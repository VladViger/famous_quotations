var Article = Backbone.Model.extend({
	defaults: {
		text: '',
		author: 'неизвестный автор',
		creator: 'аноним',
		liked: []
	},

	initialize: function() {
		this.calcRating();
		this.bind('change:liked', this.calcRating);
		this.bind('invalid', this.showError);

		if (!this.get('theDate')) {
			var date = new Date();
			this.set({'theDate': +date});
			this.set({'theDateString': this.getDateString(date)});
		}

		if (!this.get('creatorIP')) {
			this.set({'creatorIP': USER_IP});
		}

		if (this.get('author').length < 3) {
			this.set({'author': this.defaults.author});
		}

		if (this.get('creator').length < 3) {
			this.set({'creator': this.defaults.creator});
		}
	},

	validate: function(t) {
		var messageOne = 'Ошибка! \n' + 'Слишком короткая цитата.';
		var messageTwo = 'Ошибка! \n' + 'Имя должно содержать не менее 3-х букв.';

		if (t.text.length < 10) return messageOne;
		if (t.author.length < 3) return messageTwo;
		if (t.creator.length < 3) return messageTwo;
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

	addLike: function() {
		var newLiked = _.union(this.get('liked'), [USER_IP]);
		this.set('liked', newLiked);
	},

	removeLike: function() {
		var newLiked = _.without(this.get('liked'), USER_IP);
		this.set('liked', newLiked);
	},

	clear: function() {
		this.destroy();
	},

	showError: function(model, error) {
		alert(error);
	},

	urlRoot: '/fq',
	idAttribute: "_id"
});