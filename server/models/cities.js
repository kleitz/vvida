module.exports = function(sequelize, DataType) {
  return sequelize.define('Cities', {
      // City name
      // hold the name of the cities
      name: {
        type: DataType.STRING,
        allowNull: false,
      },

    },
    // table configuration
    {
      constaints: false,
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};