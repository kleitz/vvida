module.exports = function(sequelize, DataType) {
  return sequelize.define('Countries', {
      country: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      }
    },
    // table configuration
    {
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true,
    });
};
