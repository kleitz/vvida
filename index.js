var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

var config = require('./server/config')[env],
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  multer = require('multer'),
  upload = multer({
    dest: './uploads/'
  }),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./server/routes'),
  app = express(),
  passport = require('passport'),
  session = require('express-session'),
  auth = require('./server/services/auth');

// load env variables from .env file in development environment
// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(multer({
  dest: './uploads/',
  rename: function(fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  },
  onFileUploadStart: function(file) {
    console.log(file.fieldname + ' is starting ...');
  },
  onFileUploadData: function(file, data) {
    console.log(data.length + ' of ' + file.fieldname + ' arrived');
  },
  onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
}).single('photo'));

console.log(config.strategy);
auth(passport, config);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(passport.initialize());

app.use(session({
  secret: config.expressSessionKey,
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.session());
routes(app, config, passport, upload);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    next();
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

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on %d, in %s' +
    'mode', server.address().port, app.get('env'));
});

module.exports = app;
