(function() {
  'use strict';
  var User = require('../schemas/users'),
    passport = require('passport');

  module.exports = {
    // login middleware
    login: function(req, res, next) {
      passport.authenticate('login', function(err, user) {
        if (err) {
          // will generate a 409 error
          return res.status(409).send({
            error: err.message || err.errors[0].message
          });
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).send({
            error: 'authentication failed'
          });
        }
        req.session.user = user;
        return res.json(user);
      })(req, res, next);
    },

    // signup middleware
    signup: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        console.log(user);
        // check for errors, if exist send a response with error
        if (err) {
          return res.status(500).send({
            error: err.message || err.errors[0].message
          });
        }
        // If passport doesn't return the user object,  signup failed
        if (!user) {
          return res.status(500).send({
            error: 'Signup failed'
          });
        }
        // else signup succesful
        return res.json(user);
      })(req, res, next);
    },

    authenticate: function(req, res, next) {
      // check if the it's POST/PUT/DELETE request
      if (/(post|put|patch)/.test(req.method.toLowerCase())) {
        // Check if a user is logged in or is a login request
        if (req.session.user || /(login)/.test(req.path)) {
          // if yes, let the request go through
          next();
        } else {
          // Unathorized request
          res.status(401).json({
            message: 'Request is unauthorised.'
          });
        }
      } else {
        // if not just carry on
        next();
      }
    },

    session: function(req, res) {
      if (req.session.user) {
        res.status(200).send(req.session.user);
      } else {
        res.status(401).send({
          error: 'Unathorized Access'
        });
      }
    },

    // Middleware to get all users
    all: function(req, res) {
      User.findAll().then(function(users, err) {
        if (!users) {
          res.status(404).send({
            error: 'User not found'
          });
        } else if (err) {
          res.status(500).send({
            message: 'Error retrieving users',
            error: err
          });
        } else {
          users.map(function(user) {
            user.password = null;
          });
          res.json(users);
        }

      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to get users by ID
    find: function(req, res) {
      var userId = req.params.id;
      User.findOne({
        where: {
          id: userId
        }
      }).then(function(user, err) {
        if (!user) {
          res.status(404).send({
            message: 'User not found'
          });
        } else if (err) {
          res.status(500).send({
            message: 'Error retrieving user',
            err: err
          });
        } else {
          user.password = null;
          delete user.password;
          res.json(user);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middileware to update user data
    update: function(req, res) {
      // edit user email
      delete req.body.password;
      User.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        } else {
          res.send({
            message: 'Profile updated succesfully'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    delete: function(req, res) {
      res.status(501).send({
        error: 'Not implemented'
      });
    },

    logout: function(req, res) {
      req.session.destroy(function(err) {
        if (!err) {
          res.json({
            message: 'Succesfully logged out'
          });
        } else {
          res.status(500).send(err);
        }
      });
    }
  };
})();
