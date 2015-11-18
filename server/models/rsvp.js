module.exports = function(sequelize, DataType) {
  return sequelize.define('Reservations', {
      status: {
        type: DataType.STRING,
        validate: {
          isIn: {
            args: [['yes', 'no', 'maybe']],
            msg: 'Must be yes, no or maybe.'
          }
        },
        // to be clarified
        defaultValue: 'yes',
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
