//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db_connect'),
    rating = db.define('rating', {

        // FOREIGN KEY
        // references the review id in the review table
        rev_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        // FOREIGN KEY
        // references the item id in the items table
        item_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },

        // FOREIGN KEY
        // references the user id in users table
        user_id: {
            type: Seq.INTEGER,
            allowNull: false
        },
        // item name
        // hold the name of the rating
        rate_value: {
            type: Seq.INTEGER,
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = rating;
