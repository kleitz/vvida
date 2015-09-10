//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    users = require('./users'),
    notifications = db.define('notifications', {

        // FOREIGN KEY
        // references the user id in users table
        user_id: {
            type: Seq.INTEGER,
            allowNull: false,
            references: {
                model: users,
                key: 'id'
            }
        },
        // item name
        // hold the name of the notifications
        notification: {
            type: Seq.TEXT,
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = notifications;
