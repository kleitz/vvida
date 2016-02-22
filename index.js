var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

var config = require('./server/config')[env],
  express = require('express'),
  path = require('path'),
  multer = require('multer'),
  methodOverride = require('method-override'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./server/routes'),
  app = express(),
  passport = require('passport'),
  session = require('express-session'),
  models = require('./server/models/init'),
  auth = require('./server/services/auth');


// the models variable must be somehow singleton-esque
// http://bit.ly/1S9cnn5
app.set('models', models);



// load env variables from .env file in development environment
// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(multer({
  dest: './uploads/',
}).array('photos', 3));


auth(app, passport, config);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


app.use(session({
  secret: config.expressSessionKey,
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());
routes(app, config, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.message);
    next();
  });
}


var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on %d, in %s' +
    ' mode', server.address().port, app.get('env'));
});

module.exports = app;
