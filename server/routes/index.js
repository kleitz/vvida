module.exports = function(app, config, passport) {
  require('./users')(app, config, passport);
  require('./auth/facebook.auth')(app, config, passport);
  require('./auth/google.auth')(app, config, passport);
  require('./events')(app, config);
  require('./items')(app, config);
  /* GET home page. */
  app.get('/*', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
//
