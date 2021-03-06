var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(expressSession({ secret : 'sistema' }));

app.use(function (req, res, next) {

  console.log('%s - %s', req.method, req.url);
  next();

});

app.use(function (req, res, next) {

	next();

});

app.use(express.static(__dirname + '/public'));


app.use(require('./app/services'));

app.listen(port, function () {
  console.log('Server listening on port %d...', port);
});
