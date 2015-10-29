var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, passport, LocalStrategy) {
  var User = app.get('models').Users;

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

      // we require to compare the sent password
      // hashed value with the saved hashed value
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {
          message: 'invalid password'
        });
      }
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  }));
};
