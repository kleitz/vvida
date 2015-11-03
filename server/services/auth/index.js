module.exports = function(app, passport, config) {

  // Passport Configuration
  require('./local.auth')(app, passport, config);
  require('./facebook.auth')(app, passport, config);
  require('./google.auth')(app, passport, config);

};
