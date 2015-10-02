module.exports = function(app, config, passport) {

  // Redirect the user to Google for authentication.
  // When complete, Google will redirect the user back to the application at
  //     /auth/google/callback
  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }));

  // Google will redirect the user to this URL after authentication.
  // Finish the process by verifying the assertion.
  // If valid, the user will be logged in.
  // Otherwise, authentication has failed.
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-up',
    successRedirect: '/'
      // session: false
  }));

};
