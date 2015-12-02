module.exports = {
  'FACEBOOK': {
    clientID: process.env.FACEBOOK_ID || '213258518873900',
    clientSecret: process.env.FACEBOOK_SECRET || '76f13fab15780ef80bffc4ec19f24ae1',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ||
      'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'photos', 'gender']
  },
  'GOOGLE': {
    clientID: process.env.GOOGLE_ID ||
      '893360311572-s0cnhs0ffojknftltkmm9cbj1p078d7o.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'jDV73toE_qjEkjg32p8dNwZ7',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
      // returnURL: 'http://localhost:3000/auth/google/callback',
      // realm: 'http://localhost:3000/',
      // passReqToCallback: true
  }
};
