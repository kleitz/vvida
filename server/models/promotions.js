module.exports = function(sequelize, DataType) {
  return sequelize.define('ItemPromotions', {
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
      underscored: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};
