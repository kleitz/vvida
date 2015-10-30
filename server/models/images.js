module.exports = function(sequelize, DataType) {
  return sequelize.define('Images', {
      // image url
      // hold the url of the images
      url: {
        type: DataType.STRING,
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
};
