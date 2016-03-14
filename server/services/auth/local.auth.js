module.exports = function(app, passport, config) {
  var bcrypt = require('bcrypt-nodejs'),
    Users = app.get('models').Users,
    jwt = require('jsonwebtoken'),
    LocalStrategy = config.strategy.Local,
    user;

  // signup middleware for local signup
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    var hash = bcrypt.hashSync(password);
    return Users.create({
      email: email,
      password: hash
    }).then(function(newUser) {
      user = newUser.dataValues;

      user.token = null;
      var token = jwt.sign({ id: user.id }, config.superSecret, {
        expiresIn: '8760h'
      });

      user.token = token;
      Users.update({ token: token }, {
        where: {
          id: user.id
        }
      }).then(function() {
        user.password = undefined;
        return done(null, user);
      });
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
    }).then(function(getUser) {
      user = getUser.dataValues;
      if (!user) {
        return done(null, false);
      }
      // we require to compare the sent password
      // hashed value with the saved hashed value
      if (bcrypt.compareSync(password, user.password) !== true) {
        return done(null, false);
      }
      user.token = null;
      var token = jwt.sign({ id: user.id }, config.superSecret, {
        expiresIn: '8760h'
      });
      user.token = token;
      Users.update(user, {
        where: {
          id: user.id
        }
      }).then(function(ok, err) {
        if (err) {
          return done(err, null);
        }
        user.password = undefined;
        return done(null, user);
      });
    }).catch(function(err) {
      return done(err);
    });
  }));
};
