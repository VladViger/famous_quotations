var ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'quote-wrap',
	template: _.template($('#article-template').html()),

	events: {
		'click .delete.active': 'clear',
		'click .rating': 'toLike'
	},

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.setRights();
		this.setLiked();
		return this;
	},

	setRights: function() {
		var self = this;
		setTimeout(function() {
			if (self.model.get('creatorIP') != USER_IP) return;
			self.$el.find('.delete, .edit').addClass('active');
		}, 1000);
	},

	setLiked: function() {
		var self = this;
		setTimeout(function() {
			if (self.model.get('liked').indexOf(USER_IP) == -1) return;
			self.$el.find('.rating').addClass('liked');
		}, 1000);
	},

	clear: function() {
		this.model.clear();
	},

	toLike: function(e) {
		$(e.target).hasClass('liked') ? console.log('yes') : console.log('no');
		$(e.target).toggleClass('liked');
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