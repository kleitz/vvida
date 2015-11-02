var User = require('../../models/users');
// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
module.exports = function(passport, GoogleStrategy, config) {

  passport.use(new GoogleStrategy(config.auth.GOOGLE,
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

        // check if the user exists in out database
        User.findOne({
            where: {
              'google_auth_id': profile.id
            },
            attributes: ['id', 'firstname', 'lastname', 'google_auth_id']
          })
          .then(function(user) {
            // If the user does not exist create one
            if (!user) {
              User.build({
                  email: profile.emails[0].value,
                  role: 'user',
                  username: profile.username,
                  google_auth_id: profile.id,
                  google_auth_token: accessToken,
                  // provider: 'facebook',
                  // facebook: profile._json
                })
                // set their name
                .setFullName(profile.displayName)
                // save the user instance build
                .save()
                .then(function(user) {
                  done(null, user);
                })
                .catch(function(err) {
                  if (err) {
                    return done(err);
                  }
                });
            }
            // If the user was found, then just do a redirect
            else {
              // or TODO maybe create cookies/sessions
              done(null, profile);
            }
          })
          .catch(function(err) {
            if (err) {
              return done(err);
            }
          });

      });

    }
  ));

};
