module.exports = function(sequelize, DataType) {
  return sequelize.define('Categories', {
      // Type of the category
      // e.g product, service, location
      type: {
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
      freezetableName: true
    });
};
