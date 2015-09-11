//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    events = require('./events'),
    users = require('./users'),
    rsvp = db.define('rsvps', {

            // FOREIGN KEY
            // references the item id in the items table
            event_id: {
                type: Seq.INTEGER,
                allowNull: false,
                references: {
                    model: events,
                    key: 'id'
                }
            },

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
            // hold the name of the rsvp
            status: {
                type: Seq.ENUM,
                values: ['yes', 'maybe', 'no'],
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

module.exports = rsvp;
