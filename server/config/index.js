var expressKey = process.env.EXPRESS_SESSION_KEY,
customKey = '436b2efb-0302-4113-9954-f658f554ea87';
process

var envVariables = {
    expressSessionKey:expressKey || customKey,
    database: process.env.DATABASE_NAME ||'vvida',
    host: process.env.HOST || 'localhost',
    userName: process.env.USER_NAME || 'postgres',
    password: process.env.PASSWORD || 'root'
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