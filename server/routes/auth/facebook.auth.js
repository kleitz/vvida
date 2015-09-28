module.exports = function(app, config, passport) {

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.route('/auth/facebook')
    .get(passport.authenticate('facebook', {
      scope: [
        'email', 'user_about_me'
        // 'basic_info', 'user_birthday', 'user_hometown', 'user_location'
      ],
      failureRedirect: '/signup',
      session: false
    }));

  // Facebook will redirect the user to this URL after approval.
  // Finish the authentication process by attempting to obtain an access token.
  // If access was granted, the user will be logged in.
  // Otherwise, authentication has failed.
  app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
      failureRedirect: '/login',
      session: false
    }), function(req, res) {
      res.redirect('/');
    });

};
