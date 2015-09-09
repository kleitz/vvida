//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    categories = db.define('categories', {
        // Type of the category
        // e.g product, service, location

        cat_type: {
            type: Seq.STRING,
            allowNull: false,
        },

        // specifies if it is a sub category
        is_sub_cat: {
            type: Seq.BOOLEAN,
            allowNull: false
        }
    });

module.exports = categories;
