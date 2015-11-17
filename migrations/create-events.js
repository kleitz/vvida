(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Events', {

          // event name
          // hold the name of the events
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          // description
          description: {
            type: Sequelize.TEXT,
            allowNull: true
          },

          // location of the event
          location: {
            type: Sequelize.TEXT,
            allowNull: false
          },

          // venue of the event
          venue: {
            type: Sequelize.TEXT,
            allowNull: false
          },

          // time
          time: {
            type: Sequelize.DATE,
          },

          // event sponsors
          sponsor: {
            type: Sequelize.TEXT,
            allowNull: true
          }

        },
        // table configuration
        {
          // prevent time stamps from using camelase
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },

    down: function(queryInterface) {
      return queryInterface.dropTable('Events');
    }
  };
})();