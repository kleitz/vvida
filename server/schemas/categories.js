//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    categories = db.define('categories', {
            // Type of the category
            // e.g product, service, location

            cat_type: {
                type: Seq.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true
                }
            },

            // specifies if it is a sub category
            is_sub_cat: {
                type: Seq.BOOLEAN,
                allowNull: false
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

module.exports = categories;
