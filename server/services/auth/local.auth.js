module.exports = function(app, passport, config) {
  var bcrypt = require('bcrypt-nodejs'),
    Users = app.get('models').Users,
    LocalStrategy = config.strategy.Local;

  // signup middleware for local signup
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    var hash = bcrypt.hashSync(password);
    return Users.create({
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
    Users.findOne({
      where: {
        email: username
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false);
      }
      // we require to compare the sent password
      // hashed value with the saved hashed value
      if (bcrypt.compareSync(password, user.password) !== true) {
        return done(null, false);
      }
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  }));
};