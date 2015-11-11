(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('ItemPromotions', {
          // e.g sponsored, shared, recommended
          group: {
            type: Sequelize.ENUM,
            values: ['sponsored', 'shared', 'recommended'],
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
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('ItemPromotions');
    }
  };
})();
