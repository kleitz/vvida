module.exports = function(passport, LocalStrategy, FacebookStrategy, GoogleStrategy) {

  // Passport Configuration
  require('./local.auth')(passport, LocalStrategy);
  require('./facebook.auth')(passport, FacebookStrategy);
  require('./google.auth')(passport, GoogleStrategy);

};
