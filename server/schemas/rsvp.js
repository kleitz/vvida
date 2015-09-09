//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    rsvp = db.define('rsvp', {

        // FOREIGN KEY
        // references the item id in the items table
        event_id: {
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
        // hold the name of the rsvp
        status: {
            type: Seq.ENUM,
            values: ['yes', 'maybe', 'no'],
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = rsvp;
