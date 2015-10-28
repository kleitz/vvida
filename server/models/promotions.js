module.exports = function(sequelize, DataType) {
  return sequelize.define('ItemPromotions', {
      // FOREIGN KEY
      // references the item id in the items table
      // item_id: {
      //   type: DataType.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: items,
      //     key: 'id'
      //   }
      // },

      // FOREIGN KEY
      // references the user id in users table
      // The id of the person sharing, sponsoring or recommending the item
      // created_by: {
      //   type: DataType.INTEGER.UNSIGNED,
      //   allowNull: false,
      //   references: {
      //     model: users,
      //     key: 'id'
      //   }
      // },

      // FOREIGN KEY
      // references the user id in users table
      // The id of the person targeted
      // created_for: {
      //   type: DataType.INTEGER.UNSIGNED,
      //   allowNull: false,
      //   references: {
      //     model: users,
      //     key: 'id'
      //   }
      // },

      // e.g sponsored, shared, recommended
      group: {
        type: DataType.ENUM,
        values: ['sponsored', 'shared', 'recommended'],
        allowNull: false,
      }
    },

    // table configuration
    {
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscore: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};
