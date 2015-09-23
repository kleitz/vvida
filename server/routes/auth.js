var User = require('../schemas/users');

module.exports = function(passport, LocalStrategy) {
  passport.use('login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  }, function(username, password, done) {
    User.findOne({
      where: {
        email: 'thomasnyambati@gmail.com'
      }
    }).then(function(user) {
      console.log(user);
      if (!user) {
        return done(null, false);
      }

      if (user.password !== 'thomas') {
        return done(null, false);
      }

      return done(null, user);
    });
  }));
};
