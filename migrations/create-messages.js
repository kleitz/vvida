(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Messages', {
          // item name
          // hold the name of the messages
          message: {
            type: Sequelize.TEXT,
            allowNull: false,
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
      return queryInterface.dropTable('Messages');
    }
  };
})();
