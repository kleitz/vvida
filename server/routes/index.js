module.exports = function(app, config, passport) {

  require('./users')(app, passport);
  require('./auth/facebook.auth')(app, passport);
  require('./auth/google.auth')(app, passport);
  require('./events')(app, config);
  require('./items')(app, config);
  require('./countries')(app);
  require('./categories')(app);

  /* GET home page. */
  app.get('/*', function(req, res) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
