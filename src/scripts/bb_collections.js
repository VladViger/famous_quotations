// TEMP DATABASE
var DATABASE = [
	{
		"text": "Ленивые всегда собираются что-то сделать.",
		"creator": "admin",
		"creatorIP": "91.194.56.98",
		"theDate": "1411265850383",
		"theDateString": "21-09-2014",
		"liked": ["91.194.56.98"]
	},
	{
		"text": "...Вы еще не искали себя, когда обрели меня. Так бывает со всеми верующими; и потому так мало значит всякая вера.",
		"author": "Фридрих Ницше",
		"creator": "admin",
		"creatorIP": "77.122.22.175",
		"theDate": "1711065990383",
		"theDateString": "22-03-2024",
		"liked": ["10.11.6.37", "127.0.0.1", "91.194.56.98", "77.122.22.175"]
	},
	{
		"text": "Никогда не надо слушать, что говорят цветы. Надо просто смотреть на них и дышать их ароматом. Мой цветок напоил благоуханием всю мою планету, а я не умел ему радоваться.",
		"creatorIP": "91.194.56.98",
		"author": "Антуан де Сент-Экзюпери",
		"theDate": "1311265850383",
		"theDateString": "21-07-2011"
	},
	{
		"text": "Единственный разумный способ обучать людей — это подавать им пример.",
		"author": "Альберт Эйнштейн",
		"creator": "Евпатий",
		"creatorIP": "77.122.22.175",
		"theDate": "1462349975000",
		"theDateString": "04-05-2016",
		"liked": ["10.11.6.37"]
	},
	{
		"text": "Только о двух вещах мы будем жалеть на смертном одре — что мало любили и мало путешествовали.",
		"author": "Марк Твен",
		"creator": "Крутой чувак",
		"creatorIP": "77.122.22.175",
		"theDate": "1462349978000",
		"theDateString": "04-05-2016",
		"liked": ["91.194.56.98", "77.122.22.175"]
	}
];
// TEMP DATABASE END

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
	}
});

var articleList = new ArticleList(DATABASE);