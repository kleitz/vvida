module.exports = function(passport, config) {

  // Passport Configuration
  require('./local.auth')(passport, config);
  require('./facebook.auth')(passport, config);
  require('./google.auth')(passport, config);

};
