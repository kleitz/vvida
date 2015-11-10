'use strict';
var auth = require('../controllers/auth');
module.exports = function(app, config, passport) {

  require('./users')(app, passport, auth);
  require('./auth/facebook.auth')(app, passport);
  require('./auth/google.auth')(app, passport);
  require('./events')(app, auth);
  require('./items')(app, auth);
  require('./countries')(app);
  require('./categories')(app, auth);

  /* GET home page. */
  app.get('/*', function(req, res) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
