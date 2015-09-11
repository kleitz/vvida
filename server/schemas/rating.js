//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    reviews = require('./reviews'),
    users = require('./users'),
    items = require('./items'),
    rating = db.define('rating', {

            // FOREIGN KEY
            // references the review id in the review table
            rev_id: {
                type: Seq.INTEGER,
                allowNull: false,
                references: {
                    model: reviews,
                    key: 'id'
                }
            },
            // FOREIGN KEY
            // references the item id in the items table
            item_id: {
                type: Seq.INTEGER,
                allowNull: false,
                references: {
                    model: items,
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
            // hold the name of the rating
            rate_value: {
                type: Seq.INTEGER,
                allowNull: false,

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

module.exports = rating;
