(function() {
  'use strict';
  var passport = require('passport');
  var jwt = require('jsonwebtoken');
  module.exports = {
    // login middleware
    login: function(req, res, next) {
      passport.authenticate('login', function(err, user) {
        if (err) {
          return res.status(500).json({
            error: 'Something went wrong while logging you in.'
          });
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).json({
            error: 'Authentication failed.'
          });

        }
        user.password = null;
        req.session.user = user;
        return res.json(user);
      })(req, res, next);
    },

    signup: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        // check for errors, if exist send a response with error
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err.message || err.errors[0].message || err
          });
        }
        // If passport doesn't return the user object,  signup failed
        if (!user) {
          console.log('User not found');
          return res.status(500).json({
            error: 'Signup failed. User already exists.'
          });
        }
        // else signup succesful
        return res.json(user.dataValues);
      })(req, res, next);
    },

    session: function(req, res) {
      var token = req.headers['x-access-token'] || req.params('token') || req.body.token;
      var Users = req.app.get('models').Users;
      if (token && token !== 'null') {
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
          if (err) {
            res.status(403).json({
              error: 'Session has expired or does not exist.'
            });
          } else {
            Users.findById(decoded.id).then(function(user) {
              if (!user) {
                res.status(404).json({
                  message: 'User not found'
                });
              } else {
                delete user.password;
                req.decoded = user;
                res.json(user);
              }
            }).catch(function(err) {
              res.status(500).json({
                message: 'Error retrieving user',
                err: err
              });
            });
          }
        });
      } else {
        res.status(401).json({
          error: 'Session has expired or does not exist.'
        });
      }

    },

    // Middleware to get all users
    all: function(req, res) {
      var Users = req.app.get('models').Users;
      Users.findAll().then(function(users) {
        if (!users) {
          res.status(404).json({
            error: 'User not found'
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
          return res.status(500).json({
            error: err.message || err.errors[0].message
          });
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
          return res.status(500).json({
            error: err.message || err.errors[0].message
          });
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

    getItems: function(req, res) {
      var Users = req.app.get('models').Users,
        Items = req.app.get('models').Items,
        Reviews = req.app.get('models').Reviews,
        Categories = req.app.get('models').Categories;
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
      var Users = req.app.get('models').Users,
        Events = req.app.get('models').Events;
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
      var Users = req.app.get('models').Users,
        Reviews = req.app.get('models').Reviews,
        Items = req.app.get('models').Items,
        Categories = req.app.get('models').Categories;
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
      var Reviews = req.app.get('models').Reviews;
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
      var Events = req.app.get('models').Events;
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
      var Items = req.app.get('models').Items;
      Items.count({
        where: {
          user_id: req.params.id
        }
      }).then(function(results) {
        if (!results) {
          res.status(404).send({
            error: 'User items not found'
          });
        } else {
          res.json(results);
        }

      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    }
  };
})();
