//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    reviews = db.define('reviews', {

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
        // hold the name of the reviews
        review: {
            type: Seq.TEXT,
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = reviews;
