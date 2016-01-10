var express = require('express');
var config = require('./config');
var path = require('path');
var HttpError = require('./error').HttpError;
var session = require('express-session');
var mongoose = require('./libs/mongoose');

var app = express();
var logger = require('morgan');
var isDevelopment = app.get('env') == 'development';
// view engine setup
app.engine('ejs', require('ejs-locals'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var favicon = require('serve-favicon');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if(isDevelopment){
  app.use(logger('dev'));
} else {
  app.use(logger('default'))
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    key: config.get('session:sid'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({
        url: config.get('mongoose:uri'),
        autoRemove: 'native'
    })
})); //connect.sid

app.use(function (req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    res.send("visits "+ req.session.numberOfVisits)
})

app.use(require('./middleware/sendHttpError'));

var routes = require('./routes');
var users = require('./routes/users');


app.use('/', routes);
app.use('/users', users);

//static
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var errorHandler = require('errorhandler');
if(isDevelopment){
  app.use(errorHandler());
} else {
  app.use(function (err, req, res, next) {
      if(typeof err == 'number'){
          err = new HttpError(err);
      }

      if(err instanceof HttpError){
          res.sendHttpError(err);
      } else {
          console.error(err);
          err = new HttpError(500);
          res.sendHttpError(err);
      }
  })
}

/*
var routes = require('./routes/index');
var users = require('./routes/users');


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/
app.listen(config.get('port'), function () {
  console.log('Listening on port: %s', config.get('port'));
});

module.exports = app;
