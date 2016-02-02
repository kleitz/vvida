module.exports = function(sequelize, DataType) {
  return sequelize.define('Items', {
      // item name
      // hold the name of the items
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      // item description
      // gives a detailed description of what the item is all about
      description: {
        type: DataType.TEXT,
        allowNull: false
      },
      city: {
        type: DataType.STRING,
        allowNull: true
      },
      street: {
        type: DataType.STRING,
        allowNull: true
      },
      phone: {
        type: DataType.STRING,
        allowNull: true
      },
      email: {
        type: DataType.STRING,
        allowNull: true
      }
    },
    // table configuration
    {
      constraints: false,
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};
