module.exports = function(sequelize, DataType) {
  return sequelize.define('Reviews', {
      review: {
        type: DataType.TEXT,
        allowNull: false
      },
      rating: {
        type: DataType.INTEGER,
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
};
