(function() {
  'use strict';

  module.exports = function(app) {
    var passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('../config');

    var Users = app.get('models').Users,
      Items = app.get('models').Items,
      Categories = app.get('models').Categories,
      Events = app.get('models').Events,
      Reviews = app.get('models').Reviews,
      stripUser = function(user) {
        user.password = null;
        user.facebook_auth_id = null;
        user.facebook_auth_token = null;
        user.img_public_id = null;
        user.google_auth_id = null;
        user.google_auth_token = null;
        return user;
      };

    return {
      // login middleware
      login: function(req, res, next) {
        passport.authenticate('login', function(err, user) {
          if (user) {
            user.password = null;
            return res.json(user);
          } else {
            return res.status(401).json({
              error: 'Authentication failed.',
              err: err
            });
          }
        })(req, res, next);
      },

      signup: function(req, res, next) {
        passport.authenticate('signup', function(err, user) {
          // check for errors, if exist send a response with error
          if (user) {
            return res.json(stripUser(user.dataValues));
          } else {
            if (err) {
              return res.status(500).json({
                error: 'Error',
                err: err
              });
            }

            return res.status(409).json({
              error: 'User already exists.'
            });
          }
          // else signup succesful
        })(req, res, next);
      },

      session: function(req, res) {
        Users.findById(req.decoded.id).then(function(user) {
          if (user && user.token === req.token) {
            delete user.password;
            res.json(stripUser(user));
          } else {
            res.status(401).json({
              error: 'Invalid token.'
            });
          }
        }).catch(function(err) {
          res.status(500).json({
            error: 'Authentication Error.',
            err: err
          });
        });

      },

      // Middleware to get all users
      all: function(req, res) {
        Users.findAll().then(function(users) {
          if (users.length === 0) {
            res.status(200).json({
              success: true,
              message: 'User not found'
            });
          } else {
            users.map(function(user) {
              user.password = null;
            });
            res.json(users);
          }
        }).catch(function(err) {
          res.status(500).json({
            message: 'Error retrieving user',
            err: err
          });
        });
      },

      // Middleware to get users by ID
      find: function(req, res) {
        Users.findById(req.params.id).then(function(user) {
          if (!user) {
            res.status(404).json({
              message: 'User not found'
            });
          } else {
            res.json(stripUser(user));
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
        // edit user email
        Users.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).json({
              error: err.message || err.errors[0].message
            });
          } else {
            res.json({
              message: 'Profile updated successfully.'
            });
          }
        });
      },

      delete: function(req, res) {
        Users.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).json({
              error: err.message || err.errors[0].message
            });
          } else {
            res.json({
              message: 'User deleted successfully.'
            });
          }
        });
      },

      logout: function(req, res) {
        Users.update({
          token: null
        }, {
          where: {
            id: req.decoded.id
          }
        }).then(function(ok) {
          if (ok) {
            return res.json({
              message: 'Successfully logged out.'
            });
          }
        }).catch(function(err) {
          if(err) {
            res.status(500).json({
              error: 'Failed to logout user.',
              err: err
            });
          }
        });
      },

      getItems: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: Items,
            include: [Categories, Reviews]
          }]
        }).then(function(user) {
          if (!user) {
            res.status(404).send({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      getEvents: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [Events]
        }).then(function(user) {
          if (!user) {
            res.status(404).send({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      getReviews: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: Reviews,
            include: [{
              model: Items,
              include: [Categories]
            }]
          }]
        }).then(function(user) {
          if (!user) {
            res.status(404).send({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      getReviewsCount: function(req, res) {
        Reviews.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(results) {
          if (!results) {
            res.status(404).send({
              error: 'User reviews not found'
            });
          } else {
            res.json(results);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      getEventsCount: function(req, res) {
        Events.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(results) {
          if (!results) {
            res.status(404).send({
              error: 'User events not found'
            });
          } else {
            res.json(results);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      getItemsCount: function(req, res) {
        Items.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(count) {
          res.json(count || 0);
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();
