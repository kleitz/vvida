var passportConfig = require('./passport.config'),
  Strategy = require('./strategies'),
  envVariables = {
    expressSessionKey: process.env.EXPRESS_SESSION_KEY,
    auth: passportConfig,
    strategy: Strategy,
    db: {
      name: process.env.DATABASE_NAME,
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT
    }
  };

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
};
