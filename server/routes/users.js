var LocalStrategy = require('passport-local').Strategy;
module.exports = function(app, config, passport) {
  //  login with email route
  app.post('/api/login',
    //passport.authenticate('local')
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      //res.redirect('/api/users/' + req.user.username);
      res.send({
        name: "thomas"
      });
    });

  // signup with email route
  app.post('/api/signup', function(req, res) {
    res.send({
      message: "You have been rigistered as a vvida user"
    });
  });

  // users routes
  app.route('/api/users/')
    .get(function(req, res) {
      res.send({
        name: "thomas"
      });
    })
    .post(function(req, res) {
      res.send({
        message: " Hey user are you ready to edit your profile",
        params: req.params
      });
    });

  app.route('/api/users/:id')
    .get(function(req, res) {
      res.send({
        name: "thomas",
        params: req.params
      });
    })
    .put(function(req, res) {
      res.send({
        message: " Hey user are you ready to edit your profile",
        params: req.params
      });
    })
    .delete(function(req, res) {

    });
};
