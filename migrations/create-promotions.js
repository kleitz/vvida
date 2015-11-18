(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('ItemPromotions', {
          // e.g sponsored, shared, recommended
          group: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [['sponsored', 'shared', 'recommended']],
                msg: 'Must be either sponsored, shared or recommended.'
              },
            },
            allowNull: false,
            defaultValue: 'recommended'
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
      return queryInterface.dropTable('ItemPromotions');
    }
  };
})();
