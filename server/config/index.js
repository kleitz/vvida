var expressKey = process.env.EXPRESS_SESSION_KEY,
  customKey = '436b2efb-0302-4113-9954-f658f554ea87',
  envVariables = {
    expressSessionKey: expressKey || customKey,
    database: process.env.DATABASE_NAME || 'vvida',
    host: process.env.HOST || 'localhost',
    userName: process.env.USER_NAME || 'postgres',
    password: process.env.PASSWORD || 'root'
  },
  development = envVariables,
  staging = envVariables,
  production = envVariables,
  passportConfig = require('./passport.config');

module.exports = {
  development: development,
  staging: staging,
  production: production,
  auth: passportConfig,
};
