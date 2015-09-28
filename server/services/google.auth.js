var User = require('../schemas/users');
// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
module.exports = function(passport, GoogleStrategy) {

  passport.use(new GoogleStrategy({
      clientID: '893360311572-s0cnhs0ffojknftltkmm9cbj1p078d7o.apps.googleusercontent.com',
      clientSecret: 'jDV73toE_qjEkjg32p8dNwZ7',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      // returnURL: 'http://localhost:3000/auth/google/callback',
      // realm: 'http://localhost:3000/'
    },
    function(accessToken, refreshToken, profile, done) {
      User.sync();
      // check if the user exists in out database
      User.findOne({
          'google_auth_id': profile.id
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
