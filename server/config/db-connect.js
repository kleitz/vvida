var Seq = require('sequelize'),
  env = process.env.NODE_ENV || 'development',
  config = require('./index')[env],
  sequelize = new Seq(config.db.name, config.db.username, config.db.password, {
    host: config.host,
    dialect: config.db.dialect
  });

sequelize.sync({
  force: true
});

module.exports = sequelize;
