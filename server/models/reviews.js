module.exports = function(sequelize, DataType) {
  return sequelize.define('Reviews', {
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
      // user_id: {
      //   type: DataType.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: users,
      //     key: 'id'
      //   }
      // },

      review: {
        type: DataType.TEXT,
        allowNull: false
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
};
