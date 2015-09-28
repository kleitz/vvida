module.exports = function(app, config, passport) {

  // Redirect the user to Google for authentication.
  // When complete, Google will redirect the user back to the application at
  //     /auth/google/callback
  app.route('/auth/google')
    .get(passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      failureRedirect: '/signup',
      session: false
    }));

  // Google will redirect the user to this URL after authentication.
  // Finish the process by verifying the assertion.
  // If valid, the user will be logged in.
  // Otherwise, authentication has failed.
  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {
      failureRedirect: '/login',
      session: false
    }), function(req, res) {
      res.redirect('/');
    });

};
