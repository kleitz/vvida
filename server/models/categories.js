module.exports = function(sequelize, DataType) {
  return sequelize.define('Categories', {
      // Type of category
      // e.g product, service, location
      type: {
        type: DataType.STRING,
        unique: true,
        allowNull: false
      }
    },
    // table configuration
    {
      // prevent timestamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to plural
      freezetableName: true
    });
};
