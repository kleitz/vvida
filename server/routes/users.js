var User = require('../schemas/users');

module.exports = function(app, config, passport) {
  // login with email
  app.route('/api/login')
    .post(passport.authenticate('login'), function(req, res) {
      res.json({
        id: req.user.id,
        username: req.user.email,
        isLoggedIn: true
      });
    });

  // signup with email route
  app.route('/api/signup')
    .post(passport.authenticate('signup'), function(req, res) {
      res.json({
        message: "You have been succcefully sign up to vvida"
      });
    });

  // users routes
  app.route('/api/users/')
    .get(function(req, res) {
      res.json({
        name: "thomas"
      });
    })
    .post(function(req, res) {
      res.json({
        message: " Hey user are you ready to edit your profile",
        params: req.params
      });
    });
    // user email update route
  app.route('/api/users/:id')
    .get(function(req, res) {
      res.json({
        name: "thomas",
        params: req.params
      });
    })
    .put(function(req, res) {
      // edit user email
      var userId = req.param.id,
        email = req.body.email,
        update;

      update = User.update({
        email: email
      }, {
        where: {
          id: userId
        }
      }).then(function() {
        if (!update) {
          res.json({
            isUpdate: false,
            message: "Email Update failed"
          });
        } else {
          res.json({
            id: userId,
            email: email,
            message: "Email succesfully changed, nice work user",
          });
        }
      });
    })
    .delete(function(req, res) {

    });
};
