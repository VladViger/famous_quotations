var ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'quote-wrap',
	template: _.template($('#article-template').html()),

	events: {
		'click .delete.active': 'clear',
		'click .rating': 'toLike',
		'click .edit.active': 'edit'
	},

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
		this.model.bind('removeView', this.remove, this);
		this.model.bind('change:rating', this.render, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.setRights();
		this.setLiked();
		return this;
	},

	setRights: function() {
		var self = this;
		var timer;
		USER_IP ? timer = 0 : timer = 1000;
		setTimeout(function() {
			if (self.model.get('creatorIP') != USER_IP) return;
			self.$el.find('.delete, .edit').addClass('active');
		}, timer);
	},

	setLiked: function() {
		var self = this;
		var timer;
		USER_IP ? timer = 0 : timer = 1000;
		setTimeout(function() {
			if (self.model.get('liked').indexOf(USER_IP) == -1) return;
			self.$el.find('.rating').addClass('liked');
		}, timer);
	},

	clear: function() {
		this.model.clear();
	},

	toLike: function(e) {
		$(e.target).hasClass('liked') ? this.model.removeLike() : this.model.addLike();
		$(e.target).toggleClass('liked');
	},

	edit: function() {
		var view = new EditView({model: this.model});
		this.$el.html(view.render().el);
		view.articleView = this;
	}
});

var AddingView = Backbone.View.extend({
	tagName: 'section',
	className: 'row',
	template: _.template($('#set-quote-template').html()),

	events: {
		'click .btn-cancel': 'cancel',
		'click .btn-set-quote': 'addNewQuote'
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	cancel: function() {
		this.remove();
	},

	addNewQuote: function(e) {
		e.preventDefault();
		var text = this.$el.find('.quote-text').val();
		var author = this.$el.find('.quote-author').val();
		var sign = this.$el.find('.quote-sign').val();

		var model = new Article({
			text: text,
			author: author,
			creator: sign
		});

		if (model.isValid()) {
			articleList.add(model);
		} else {
			model.validationError;
			model.destroy();
		}
		
		this.remove();
	}
});

var EditView = AddingView.extend({
	events: {
		'click .btn-cancel': 'cancel',
		'click .btn-set-quote': 'editQuote'
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.find('.quote-text').val( this.model.get('text') );
		this.$el.find('.quote-author').val( this.model.get('author') );
		this.$el.find('.quote-sign').val( this.model.get('creator') );
		return this;
	},

	cancel: function(e) {
		e.preventDefault();
		this.articleView.render();
		this.remove();
	},

	editQuote: function(e) {
		e.preventDefault();
		var text = this.$el.find('.quote-text').val();
		var author = this.$el.find('.quote-author').val();
		var sign = this.$el.find('.quote-sign').val();
		this.model.set({
			text: text,
			author: author,
			creator: sign
		},
		{
			validate: true
		});
		this.articleView.render();
		this.remove();
	}
});

var AppView = Backbone.View.extend({
	el: $('#toolbar'),

	events: {
		'click .add-quote': 'showForm',
		'click .sort-date': 'sortByDate',
		'click .sort-rating': 'sortByRating',
		'click .sort-name': 'sortByAuthor'
	},

	initialize: function() {
		this.addAll(articleList);
		articleList.bind('add', this.addOne, this);
	},

	addOne: function(article) {
		var view = new ArticleView({model: article});
		this.$el.after(view.render().el);
	},

	addAll: function(collection) {
		_.each(collection.models, function(item) {
            this.addOne(item);
        }, this);
	},

	clear: function(collection) {
		_.each(collection.models, function(model) {
			model.trigger('removeView');
		})
	},

	showForm: function() {
		if ($('.set-quote').length) return;
		var view = new AddingView();
		this.$el.after(view.render().el);
	},

	setClassSortEl: function(target) {
		var $target = $(target);
		if ( !$target.hasClass('active') ) {
			this.$el.find('.active').removeClass('active');
			$target.addClass('active');
		}
		$target.toggleClass('up');
	},

	sortByDate: function(e) {
		$(e.target).hasClass('up') ?
			articleList.sortByDateDown() : articleList.sortByDateUp();
		this.clear(articleList);
		this.addAll(articleList);
		this.setClassSortEl(e.target);
	},

	sortByRating: function(e) {
		$(e.target).hasClass('up') ?
			articleList.sortByRatingDown() : articleList.sortByRatingUp();
		this.clear(articleList);
		this.addAll(articleList);
		this.setClassSortEl(e.target);
	},

	sortByAuthor: function(e) {
		$(e.target).hasClass('up') ?
			articleList.sortByAuthorDown() : articleList.sortByAuthorUp();
		this.clear(articleList);
		this.addAll(articleList);
		this.setClassSortEl(e.target);
	}
});

var app = new AppView();