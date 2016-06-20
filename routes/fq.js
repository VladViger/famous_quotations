var express = require('express');
var router = express.Router();
var Quote = require('../libs/mongoose');

router.get('/', function(req, res, next) {
	return Quote.find(function(err, quotes) {
		if (err) throw err;
		return res.send(quotes);
	});
});

router.post('/', function(req, res, next) {
	var quote;
	quote = new Quote({
		text: req.body.text,
		author: req.body.author,
		creator: req.body.creator,
		creatorIP: req.body.creatorIP,
		theDate: req.body.theDate,
		theDateString: req.body.theDateString,
		liked: req.body.liked
	});
	quote.save();
	return res.send(quote);
});

router.put('/:id', function(req, res, next) {
	return Quote.findById(req.params.id, function(err, quote) {
		if (!quote) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		}
		quote.text = req.body.text;
		quote.author = req.body.author;
		quote.creator = req.body.creator;
		quote.liked = req.body.liked;

		return quote.save(function(err) {
			if (err) throw err;
			return res.send({ message: 'Quote updated' });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	return Quote.findById(req.params.id, function(err, quote) {
		if (!quote) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		}
		return quote.remove(function(err) {
			if (err) throw err;
			return res.json({ message: 'Successfully deleted' });
		});
	});
});

module.exports = router;