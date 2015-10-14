var envVariables = {
    expressSessionKey: process.env.EXPRESS_SESSION_KEY,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD,

  },
  development = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
  },
  staging = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
  },
  production = {
    expressSessionKey: envVariables.expressSessionKey,
    database: envVariables.database,
    host: envVariables.host,
    username: envVariables.userName,
    password: envVariables.password,
  };

module.exports = {
  development: development,
  staging: staging,
  production: production,
};
