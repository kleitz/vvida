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
        id: req.user.id,
        email: req.user.email,
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

  app.route('/api/users/:id')
    .get(function(req, res) {
      res.json({
        name: "thomas",
        params: req.params
      });
    })
    .put(function(req, res) {
      res.json({
        message: " Hey user are you ready to edit your profile",
        params: req.params
      });
    })
    .delete(function(req, res) {

    });
};
