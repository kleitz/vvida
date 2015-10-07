var Seq = require('sequelize'),
  env = process.env.NODE_ENV || 'development',
  config = require('./index')[env],
  sequelize = new Seq(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres'
  });

module.exports = sequelize;
