module.exports = {
  'FACEBOOK': {
    clientID: process.env.FACEBOOK_ID || '213258518873900',
    clientSecret: process.env.FACEBOOK_SECRET ||
      '76f13fab15780ef80bffc4ec19f24ae1',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ||
      'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'photos', 'gender', 'email']
  },
  'GOOGLE': {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }
};
