var expressKey = process.env.EXPRESS_SESSION_KEY,
customKey = '436b2efb-0302-4113-9954-f658f554ea87';

var envVariables = {
    expressSessionKey:expressKey || customKey,
    database: process.env.DATABASE_NAME ||'vvida',
    host: process.env.HOST || 'localhost',
    userName: process.env.USER_NAME || 'postgres',
    password: process.env.PASSWORD || 'root',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '893360311572-s0cnhs0ffojknftltkmm9cbj1p078d7o.apps.googleusercontent.com'
  },
  development = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
    googleClientSecret:envVariables.googleClientSecret
  },
  staging = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
    googleClientSecret:envVariables.googleClientSecret
  },
  production = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
    googleClientSecret:envVariables.googleClientSecret
  };

module.exports = {
  development: development,
  staging: staging,
  production: production,
};