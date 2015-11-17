(function() {
  'use strict';
  var passport = require('passport'),
    countryArray = require('./countries.js');
  module.exports = {
    // login middleware
    login: function(req, res, next) {
      passport.authenticate('login', function(err, user) {
        if (err) {
          res.status(500).json({
            error: 'Something went wrong while logging you in'
          });
          return;
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          res.status(500).json({
            error: 'Authentication failed.'
          });
          return;
        }

        user.password = null;
        req.session.user = user;
        res.json(user);
      })(req, res, next);
    },

    // signup middleware
    signup: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        // check for errors, if exist send a response with error
        if (err) {
          res.status(500).json({
            error: err.message || err.errors[0].message || err
          });
          return;
        }
        // If passport doesn't return the user object,  signup failed
        if (!user) {
          res.status(500).json({
            error: 'Signup failed. User already exists.'
          });
          return;
        }
        // else signup succesful
        res.json(user.dataValues);
      })(req, res, next);
    },

    session: function(req, res) {
      if (req.decoded) {
        res.status(200).json(req.decoded);
      } else {
        res.status(401).json({
          error: 'Unathorized Access'
        });
      }
    },

    // Middleware to get all users
    all: function(req, res) {
      var Users = req.app.get('models').Users;
      Users.findAll().then(function(users, err) {
        if (!users) {
          res.status(404).json({
            error: 'User not found'
          });
        } else if (err) {
          res.status(500).json({
            message: 'Error retrieving users',
            error: err
          });
        } else {
          users.map(function(user) {
            user.password = null;
          });
          res.json(users);
        }
      });
    },

    // Middleware to get users by ID
    find: function(req, res) {
      var Users = req.app.get('models').Users;
      Users.findById(req.params.id).then(function(user) {
        if (!user) {
          res.status(404).json({
            message: 'User not found'
          });
        } else {
          user.password = null;
          delete user.password;
          res.json(user);
        }
      }).catch(function(err) {
        res.status(500).json({
          message: 'Error retrieving user',
          err: err
        });
      });
    },

    // Middileware to update user data
    update: function(req, res) {
      var Users = req.app.get('models').Users;
      // edit user email
      Users.update(req.body, {
        where: {
          id: req.params.id,
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
          return;
        }

        res.json({
          message: 'Profile updated successfully.'
        });
      });
    },

    delete: function(req, res) {
      var Users = req.app.get('models').Users;
      Users.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
          return;
        }
        res.json({
          message: 'User deleted successfully'
        });
      });
    },

    logout: function(req, res) {
      req.session.destroy(function(err) {
        if (!err) {
          res.json({
            message: 'Successfully logged out'
          });
        } else {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        }
      });
    },

    countries: function(req, res) {
      res.status(200).send(countryArray);
    }
  };
})();
