var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fq');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log("Connection error!");
});

db.once('open', function callback () {
	console.log("Connected to DB!");
});

var Quote = mongoose.model('Quote', {
	text: String,
	author: String,
	creator: String,
	creatorIP: String,
	theDate: String,
	theDateString: String,
	liked: Array
});

module.exports = Quote;