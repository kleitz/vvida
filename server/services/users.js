var User = require('../schemas/users'),
  passport = require('passport');

module.exports = {
  // login middleware
  logIn: function(req, res, next) {
    passport.authenticate('login', function(err, user) {
      if (err) {
        // will generate a 409 error
        return res.status(409).send({
          success: false,
          error: err.errors[0].message
        });
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send({
          success: false,
          message: 'authentication failed'
        });
      }
      return res.json(user);
    })(req, res, next);
  },

  // singup middleware
  signUp: function(req, res, next) {
    passport.authenticate('signup', function(err, user) {
      // check for errors, if exist send a response with error
      if (err) {
        return res.status(500).send({
          success: false,
          error: err.errors[0].message
        });
      }
      // If passport doesn't return the user object,  signup failed
      if (!user) {
        return res.status(500).send({
          success: false,
          error: 'Signup failed'
        });
      }
      // else signup succesful
      return res.json(user);
    })(req, res, next);
  },

  // Middleware to get all users
  getAllUsers: function(req, res) {
    User.findAll().then(function(user) {
      if (!user) {
        res.status(404).send({
          success: false,
          error: 'User not found'
        });
      } else {
        //user.password = null;
        delete user.password;
        res.json(user);
      }
    });
  },

  // Middleware to get users by ID
  getUserById: function(req, res) {
    var userId = req.params.id;
    User.findOne({
      where: {
        id: userId
      }
    }).then(function(user) {
      if (!user) {
        res.status(404).send({
          success: false,
          message: 'User not found'
        });
      } else {
        user.password = null;
        delete user.password;
        res.json(user);
      }
    });
  },
  // Middileware to update user data
  updateUser: function(req, res) {
    // edit user email
    delete req.body.password;
    var update = User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(ok, err) {
      if (err) {
        res.status(500).send({
          success: false,
          error: err.errors[0].message
        });
      } else {
        res.send({
          success: true,
          message: 'Profile updated succesfully'
        });
      }
    });
  },

  deleteUser: function(req, res) {
    res.status(501).send('Not implemented');
  }


};
