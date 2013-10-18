// Keystorm
// Sam Gruber <grubermensch@gmail.com>
// Main application file

var express = require('express')
  , mongoose = require('mongoose')
  , app = module.exports = express()
  , Key = require('./keymodel.js');

mongoose.connect('mongodb://localhost/keystorm');

app.configure(function() {
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/static'));
});

// Counter for files
global.keyCounter = -1;
Key.count(function (err, ct) {
  console.log('Setting global keyCounter to ' + ct);
  global.keyCounter = ct;
});

var api = require('./api.js');
//app.post('/addKey', api.addKey);
//app.get('/listKeys', api.listKeys);
var views = require('./views.js');
app.get('/', views.home);
app.get('/register', views.register);
app.get('/plan'), views.plan);
app.get('/:other', views.fourohfour); // fall-through

var port = 3000;
app.listen(port);
console.log("Keystorm listening on port %d", port);
