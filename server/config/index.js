var envVariables = {
    expressSessionKey: process.env.EXPRESS_SESSION_KEY,
    db: {
      name: process.env.DATABASE_NAME,
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  },
  development = {
    expressSessionKey: envVariables.expressSessionKey,
    db: envVariables.db
  },
  staging = {
    expressSessionKey: envVariables.expressSessionKey,
    db: envVariables.db
  },
  production = {
    expressSessionKey: envVariables.expressSessionKey,
    db: envVariables.db
  };

module.exports = {
  development: development,
  staging: staging,
  production: production,
};
