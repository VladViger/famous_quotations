var mongoose = require('mongoose');

mongoose.connect('mongodb://fquser:fqpass@ds040309.mlab.com:40309/fq');
var db = mongoose.connection;

db.on('error', function(err) {
	console.error('Database connection error: \n', err.message);
});

db.once('open', function() {
	console.log('Connected to database.');
});

var Quote = mongoose.model('Quote', {
	text: String,
	author: String,
	creator: String,
	creatorIP: String,
	theDate: Number,
	theDateString: String,
	liked: Array
});

module.exports = Quote;