module.exports = function(app, auth) {
  // login with email
  app.route('/account')
    .get(function(req, res) {
      console.log({
        user: req.user
      });
    });
};
