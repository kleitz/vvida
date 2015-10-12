var User = require('../schemas/users');

module.exports = function(app, config, passport) {
  // login with email
  app.route('/api/login')
    .post(passport.authenticate('login'), function(req, res) {
      res.json(req.user);
    });

  // signup with email route
  app.route('/api/signup')
    .post(passport.authenticate('signup', {
      failureFlash: 'Invalid username or password.'
    }), function(req, res) {
      res.json(req.user);
    });

  // users routes
  app.route('/api/users')
    .get(function(req, res) {
      User.findAll().then(function(user) {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          //user.password = null;
          delete user.password;
          res.json(user);
        }
      });
    })
    .post(function(req, res) {
      res.json({
        message: 'Hey user are you ready to edit your profile',
        params: req.params
      });
    });

  // user email update route
  app.route('/api/users/:id')
    .get(function(req, res) {
      var userId = req.params.id;
      User.findOne({
        where: {
          id: userId
        }
      }).then(function(user) {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          user.password = null;
          delete user.password;
          res.json(user);
        }
      });
    })
    .put(function(req, res) {
      // edit user email
      delete req.body.password;
      var update = User.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function() {
        if (!update) {
          res.status(500).send('Error updating profile.');
        } else {
          res.send('Profile updated successfully.');
        }
      });
    })
    .delete(function(req, res) {
      res.status(501).send('Not implemented');
    });
};
