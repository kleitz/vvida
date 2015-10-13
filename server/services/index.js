module.exports = function(passport, LocalStrategy, FacebookStrategy, GoogleStrategy, config) {

  // Passport Configuration
  require('./local.auth')(passport, LocalStrategy, config);
  require('./facebook.auth')(passport, FacebookStrategy, config);
  require('./google.auth')(passport, GoogleStrategy, config);

};
