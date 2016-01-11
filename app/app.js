var express = require('express');
var config = require('./config');
var path = require('path');
var HttpError = require('./error').HttpError;
var session = require('express-session');
var mongoose = require('./libs/mongoose');

var app = express();
var http = require('http');
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

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

var routes = require('./routes');
var users = require('./routes/users');
var login = require('./routes/login');
var chat = require('./routes/chat');
var logout = require('./routes/logout');


app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/chat', chat);
app.use('/logout', logout);

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

var server = http.createServer(app);
server.listen(config.get('port'), function () {
  console.log('Listening on port: %s', config.get('port'));
});

require('./socket')(server);

module.exports = app;
