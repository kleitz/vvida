var Seq = require('sequelize'),
  env = process.env.NODE_ENV || 'development',
  config = require('./index')[env],
  sequelize;

if (env === 'development') {
  sequelize = new Seq(config.db.name, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port
  });
} else {
  sequelize = new Seq(config.db.url, {
    host: config.host,
    protocol: 'postgres',
    dialect: config.db.dialect,
    port: config.db.port,
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });
}


// log the progress/outcome of the connection
sequelize.authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database:', err);
  });

sequelize.sync({
  // force: true
});
module.exports = sequelize;
