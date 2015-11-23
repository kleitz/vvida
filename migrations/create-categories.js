(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Categories', {
          // category id
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          // Type of the category
          // e.g product, service, location
          type: {
            type: Sequelize.STRING,
            allowNull: false
          }
        },
        // table configuration
        {
          // prevent timestamps from using camelase
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // prevent sequelize from transforming the user tables to plural
          freezetableName: true
        });
    },

    down: function(queryInterface) {
      return queryInterface.dropTable('Categories');
    }
  };
})();
