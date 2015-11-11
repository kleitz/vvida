(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Items', {
          // item name
          // hold the name of the items
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          // item description
          // gives a detailed description of what the item is all about

          description: {
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

    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('Items');
    }
  };
})();
