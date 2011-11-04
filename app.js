var
	express = require('express'),
	app = module.exports = express.createServer(),
	mongodb = require('mongodb'),
	client = new mongodb.Db('ContactBook', new mongodb.Server('127.0.0.1', 27017, {})),
	contactModelFactory = require('./contactModel'),
	contactModel;

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes


client.open(function(error, connection) {

	contactModel = contactModelFactory.createContactModel(connection);

	app.get('/', function(req, res){
		res.render('index', {
			title: 'Contact Book'
		});
	});

	app.get('/contact', function(req, res){
		contactModel.readByEmailAddress('paul.serby@clock.co.uk', function(error, contact) {
			res.render('contact', {
				title: 'Contact Book',
				contact: contact
			});
		});
	});

	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


});