var expressKey = process.env.EXPRESS_SESSION_KEY,
  passportConfig = require('./passport.config'),
  envVariables = {
    expressSessionKey: expressKey,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD ,
    auth: passportConfig
  },
  development = envVariables,
  staging = envVariables,
  production = envVariables;

module.exports = {
  development: development,
  staging: staging,
  production: production,
};
