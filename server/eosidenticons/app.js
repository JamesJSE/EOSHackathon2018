var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
		const headers = {};
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Allow-Headers"] = "cache-control, Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
		res.writeHead(200, headers);
		res.end();
  } else {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "cache-control, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  }
});

app.use('/', indexRouter);
app.use('/account', accountRouter);

module.exports = app;
