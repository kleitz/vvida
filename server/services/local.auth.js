var User = require('../schemas/users'),
  bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, LocalStrategy) {
  // signup middleware for local signup
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    User.sync().then(function() {
      var hash = bcrypt.hashSync(password);
      return User.create({
        email: email,
        password: hash
      });
    }).then(function(user) {
      if (!user) {
        return done(null, false, {
          message: 'sign up failed'
        });
      } else {
        done(null, user);
      }
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
        return done(null, false, {
          message: 'user not found'
        });
      }

      // we require to compare the sent password
      // hashed value with the saved hashed value
      var hashedPassword = bcrypt.hashSync(password);
      if (user.password !== hashedPassword) {
        return done(null, false, {
          message: 'invalid password'
        });
      }

      return done(null, user);
    });
  }));
};
