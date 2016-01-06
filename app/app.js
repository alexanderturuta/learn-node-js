var express = require('express');
var config = require('config')
var path = require('path');

var app = express();
var logger = require('morgan');
var isDevelopment = app.get('env') == 'development';
// view engine setup
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
} else{
  app.use(function (err, req, res, next) {
      res.status(500).send('Internal Server Error');
  })
}

app.use(function (err, req, res, next) {
  if(!isDevelopment){
    res.status(500).send('Internal Server Error');
  }
})

/*app.use(function (err, req, res, next) {
  if(app.get('env') == 'development'){
    errorHandler();
  } else {
    res.status(500).send('Internal Server Error');
  }
});*/

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
