var User = require('../schemas/users');
// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object
module.exports = function(passport, FacebookStrategy) {

  passport.use(new FacebookStrategy({
      clientID: '213258518873900',
      clientSecret: '76f13fab15780ef80bffc4ec19f24ae1',
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      User.sync();
      // check if the user exists in out database
      User.findOne({
          'facebook_auth_id': profile.id
        },
        function(err, user) {
          // If the user does not exist create one
          if (!user) {
            User
              .build({
                email: profile.emails[0].value,
                role: 'user',
                username: profile.username
                  // provider: 'facebook',
                  // facebook: profile._json
              })
              .fullName(profile.displayName)
              .save()
              .then(function(user) {
                done(null, user);
              })
              .catch(function(err) {
                if (err) {
                  return done(err);
                }
              });
          } else {
            return done(err, user);
          }
        });
    }
  ));

};
