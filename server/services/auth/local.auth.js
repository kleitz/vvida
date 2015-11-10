module.exports = function(app, passport, config) {
  var bcrypt = require('bcrypt-nodejs'),
    Users = app.get('models').Users,
    jwt = require('jsonwebtoken'),
    LocalStrategy = config.strategy.Local;

  // signup middleware for local signup
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    Users.sync().then(function() {
      var hash = bcrypt.hashSync(password);
      return Users.create({
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
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {
          message: 'invalid password'
        });
      }

      delete user.token;
      user.token = null;
      var token = jwt.sign(user, app.get('superSecret'), {
        expireIn: 180
      });

      user.token = token;
      console.log(user);

      Users.update(user, {
        where: {
          email: user.email
        }
      }).then(function(ok, err) {
        if (err) {
          return done(err, null);
        }
        user.password = undefined;
        done(null, user);
      });
    }).catch(function(err) {
      return done(err);
    });
  }));
};
