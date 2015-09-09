//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db_connect'),
    images = db.define('images', {

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
        // image url
        // hold the url of the images
        img_url: {
            type: Seq.STRING,
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = images;
