(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Reviews', {
          review: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          review_title: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
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
      return queryInterface.dropTable('Reviews');
    }
  };
})();
