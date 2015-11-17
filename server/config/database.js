var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

var config = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT
};

module.exports = {
  'development': config,
  'test': config,
  'production': config
};
