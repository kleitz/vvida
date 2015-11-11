(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Categories', {
          // Type of the category
          // e.g product, service, location
          type: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
      return queryInterface.dropTable('Categories');
    }
  };
})();
