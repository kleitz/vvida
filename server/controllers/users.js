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
        user.password = null;
        req.session.user = user;
        return res.json(user);
      })(req, res, next);
    },

    signup: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        // check for errors, if exist send a response with error
        if (err) {
          return res.status(500).send({
            error: err.errors || err.message
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

    authenticate: function(req, res, next) {
      // check if the it's POST/PUT/DELETE request
      if (/(post|put|patch)/.test(req.method.toLowerCase())) {
        // Check if a user is logged in, is a login or signup request
        if (req.session.user || /(users|login)$/.test(req.path)) {
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
      var Users = req.app.get('models').Users;
      Users.findAll().then(function(users) {
        if (!users) {
          res.status(404).send({
            error: 'User not found'
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
      }).then(function(user) {
        if (!user) {
          res.status(404).send({
            message: 'User not found'
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
      var Users = req.app.get('models').Users;
      Users.destroy({
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
            message: 'User deleted succesfully'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
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
