module.exports = function(sequelize, DataType) {
  return sequelize.define('Categories', {
      // Type of the category
      // e.g product, service, location
      cat_type: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },

      // specifies if it is a sub category
      is_sub_cat: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    // table configuration
    {
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscore: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};
