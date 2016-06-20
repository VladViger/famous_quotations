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

		if (!this.get('author')) {
			this.set({'author': this.defaults.author});
		}

		if (!this.get('creator')) {
			this.set({'creator': this.defaults.creator});
		}
	},

	validate: function(t) {
		var messageOne = 'Ошибка! \n' + 'Слишком короткая цитата.';
		var messageTwo = 'Ошибка! \n' + 'Слишком длинная цитата.';
		var messageThree = 'Ошибка! \n' + 'Имя автора должно содержать от 3 до 40 символов.';
		var messageFour = 'Ошибка! \n' + 'Подпись должна содержать от 3 до 20 символов.';

		if (t.text.length < 20) return messageOne;
		if (t.text.length > 1000) return messageTwo;
		if (t.author.length < 3 || t.author.length > 40) return messageThree;
		if (t.creator.length < 3 || t.creator.length > 20) return messageFour;
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
		this.save();
	},

	removeLike: function() {
		var newLiked = _.without(this.get('liked'), USER_IP);
		this.set('liked', newLiked);
		this.save();
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