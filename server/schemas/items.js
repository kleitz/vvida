//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    users = require('./users')
    categories = require('./categories'),
    items = db.define('items', {

            // FOREIGN KEY
            // references the category id in the categories table
            cat_id: {
                type: Seq.INTEGER,
                allowNull: false,
                references: {
                    model: categories,
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
            // hold the name of the items
            item_name: {
                type: Seq.STRING,
                allowNull: false,
            },
            // item description
            // gives a detailed description of what the item is all about

            item_desc: {
                type: Seq.TEXT,
                allowNull: true
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

module.exports = items;
