(function() {
  'use strict';

  var Sequelize = require('sequelize'),
    env = process.env.NODE_ENV || 'development',
    config = require('./index')[env],
    sequelize = new Sequelize(config.db.url, {
      protocol: 'postgres',
      dialect: config.db.dialect,
      port: config.db.port,
      logging: false,
      dialectOptions: {
        ssl: /(production|staging)/.test(env)
      }
    });

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

})();