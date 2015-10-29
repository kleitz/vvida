module.exports = function(sequelize, DataType) {
  return sequelize.define('Rating', {
      rate_value: {
        type: DataType.INTEGER,
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
