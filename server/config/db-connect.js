var Seq = require('sequelize'),
  env = process.env.NODE_ENV || 'development',
  config = require('./index')[env],
  sequelize = new Seq(config.db.name, config.db.username, config.db.password, {
    host: config.host,
    dialect: config.db.dialect,
    port: 5433
  });

// log the progress/outcome of the connection
sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database:', err);
  });

// sequelize.sync({
//   force: true
// });
module.exports = sequelize;
