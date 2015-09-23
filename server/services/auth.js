var User = require('../schemas/users'),
  bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, localStrategy) {
  // signup middleware for local signup
  passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    (function() {
      return User.create({
        email: email,
        password: password
      });
    })().then(function() {
      if(!user) {
        return done(null, false, {message: "Signup failed"});
      } else {
        done(null, user);
      }
    });
  }));

  // login middileware for local login
  // passport.use('login', new localStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password',
  //   session: true
  // }, function(username, password, done) {
  //   User.findOne({
  //     where: {
  //       email: username
  //     }
  //   }).then(function(user) {
  //     console.log(user);
  //     if (!user) {
  //       return done(null, false, { message: "User Not found"});
  //     }

  //     if (user.password !== password) {
  //       return done(null, false, { message: "Invalid password"});
  //     }

  //     return done(null, user);
  //   });
  // }));
};
