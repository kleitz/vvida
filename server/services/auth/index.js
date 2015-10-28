module.exports = function(app, passport, LocalStrategy, FacebookStrategy, GoogleStrategy, config) {

  // Passport Configuration
  require('./local.auth')(app, passport, LocalStrategy, config);
  require('./facebook.auth')(app, passport, FacebookStrategy, config);
  require('./google.auth')(app, passport, GoogleStrategy, config);

};
