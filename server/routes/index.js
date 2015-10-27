module.exports = function(app, config, passport) {
  // Authenticate the API routes
  app.all('/api/*', function(req, res, next) {
    // check if the it's POST/PUT/DELETE request
    if (/(post|put|patch)/.test(req.method.toLowerCase())) {
      // Check if a user is logged in or is a login request
      if (req.session.user || /(login)/.test(req.path)) {
        // if yes, let the request go through
        next();
      } else {
        // Unathorized request
        res.status(401).json({
          message: 'Request is unauthorised.'
        });
      }
    } else {
      // if not just carry on
      next();
    }
  });

  require('./users')(app, config, passport);
  require('./auth/facebook.auth')(app, config, passport);
  require('./auth/google.auth')(app, config, passport);
  require('./events')(app, config);
  require('./items')(app, config);

  /* GET home page. */
  app.get('/*', function(req, res) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
