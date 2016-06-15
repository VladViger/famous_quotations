var ArticleList = Backbone.Collection.extend({
	model: Article,

	comparator: function(article) {
		return +article.get('theDate');
	},

	sortByDateUp: function() {
		this.models.sort(function(a, b) {
			return a.get('theDate') - b.get('theDate');
		});
	},

	sortByDateDown: function() {
		this.models.sort(function(a, b) {
			return b.get('theDate') - a.get('theDate');
		});
	},

	sortByRatingUp: function() {
		this.models.sort(function(a, b) {
			return a.get('rating') - b.get('rating');
		});
	},

	sortByRatingDown: function() {
		this.models.sort(function(a, b) {
			return b.get('rating') - a.get('rating');
		});
	},

	sortByAuthorUp: function() {
		this.models.sort(function(a, b) {
			if (a.get('author').toLowerCase() < b.get('author').toLowerCase()) {
				return 1;
			} else {
				return -1;
			}
		});
	},

	sortByAuthorDown: function() {
		this.models.sort(function(a, b) {
			if (a.get('author').toLowerCase() > b.get('author').toLowerCase()) {
				return 1;
			} else {
				return -1;
			}
		});
	},

	url: '/fq'
});

var articleList = new ArticleList();
articleList.fetch();