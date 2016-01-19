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
      '916695311856-7ilao3fc6r9pjii54rbifp7suqbrmnsr.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'YDNPeixo_lcotLvFqgMPk4es',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://127.0.0.1:3000/auth/google/callback'
    // returnURL: 'http://localhost:3000/auth/google/callback',
    // realm: 'http://localhost:3000/',
    // passReqToCallback: true
  }
};