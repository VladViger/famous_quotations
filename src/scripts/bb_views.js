var ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'quote-wrap',
	template: _.template($('#article-template').html()),

	events: {

	},

	initialize: function() {
		
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


// temp
var AppView = Backbone.View.extend({
	el: $('#toolbar'),

	initialize: function() {
		articleList.bind('add', this.addOne, this);
	},

	render: function() {

	},

	addOne: function(article) {
		var view = new ArticleView({model: article});
		this.$el.after(view.render().el);
	}
});

var app = new AppView();