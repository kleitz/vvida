var User = require('../../schemas/users'),
  bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, LocalStrategy) {
  // signup middleware for local signup
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    var hash = bcrypt.hashSync(password);
    return User.create({
      email: email,
      password: hash
    }).then(function(user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  }));

  // login middileware for local login
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  }, function(username, password, done) {
    User.findOne({
      where: {
        email: username
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false);
      }
      if (bcrypt.compareSync(password, user.password) !== true) {
        return done(null, false);
      }
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  }));
};
