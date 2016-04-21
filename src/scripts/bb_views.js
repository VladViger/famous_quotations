var ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'quote-wrap',
	template: _.template($('#article-template').html()),

	events: {
		'click .delete.active': 'clear'
	},

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.setRights(this.$el);
		return this;
	},

	setRights: function(el) {
		console.log(USER_IP);
		if (this.model.get('liked').indexOf(USER_IP) == -1) return;
		el.find('.delete').addClass('active');
	},

	clear: function() {
		this.model.clear();
	}
});


var AppView = Backbone.View.extend({
	el: $('#toolbar'),

	initialize: function() {
		this.addAll(articleList);
		articleList.bind('add', this.addOne, this);
	},

	render: function() {

	},

	addOne: function(article) {
		var view = new ArticleView({model: article});
		this.$el.after(view.render().el);
	},

	addAll: function(collection) {
		var self = this;
		_.each(collection.models, function(item) {
            self.addOne(item);
        }, this);
	}
});

var app = new AppView();