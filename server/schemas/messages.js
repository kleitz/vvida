//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    messages = db.define('messages', {

        // FOREIGN KEY
        // references the item id in the items table
        user_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },

        // FOREIGN KEY
        // references the user id in users table
        reciever_id: {
            type: Seq.INTEGER,
            allowNull: false
        },
        // item name
        // hold the name of the messages
        message: {
            type: Seq.TEXT,
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = messages;
