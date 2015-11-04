(function() {
  'use strict';
  var passport = require('passport');

  module.exports = {
    // login middleware
    login: function(req, res, next) {
      passport.authenticate('login', function(err, user) {
        if (err) {
          return res.status(500).send({
            error: err.message || err.errors[0].message
          });
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).send({
            error: 'Authentication failed.'
          });
        }
        req.session.user = user;
        return res.json(user);
      })(req, res, next);
    },

    // signup middleware
    signup: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        // check for errors, if exist send a response with error
        if (err) {
          return res.status(500).send({
            error: err.errors[0].message || err.message
          });
        }
        // If passport doesn't return the user object,  signup failed
        if (!user) {
          return res.status(500).send({
            error: 'Signup failed. User already exists.'
          });
        }
        // else signup succesful
        return res.json(user.dataValues);
      })(req, res, next);
    },

    // authenticate either POST/PUT/DELETE request
    // that requires a user to be logged in
    // if yes, let the request go through
    authenticate: function(req, res, next) {
      if (req.user) {
        next();
      } else {
        // Unathorized request
        res.status(401).json({
          message: 'Request is unauthorised.'
        });
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
      var Users = req.app.get('models').Users;
      Users.findAll().then(function(users, err) {
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
      var Users = req.app.get('models').Users,
        userId = req.params.id;

      Users.findOne({
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
      var Users = req.app.get('models').Users;
      // edit user email
      delete req.body.password;
      Users.update(req.body, {
        where: {
          id: req.params.id,
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
