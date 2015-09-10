//var require the sequelize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    users = require('./users'),
    items = require('./items'),
    item_group = db.define('item_group', {

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
        // The id of the person sharing, sponsoring or recommending the item
        created_by: {
            type: Seq.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: users,
                key: 'id'
            }
        },

        // FOREIGN KEY
        // references the user id in users table
        // The id of the person targeted

        created_for: {
            type: Seq.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: users,
                key: 'id'
            }
        }
        // item name
        // e.g sponsored, shared, recommended
        group: {
            type: Seq.ENUM,
            values: ['sponsored', 'shared', 'recommended'],
            allowNull: false,
        },

        // TODO
        //note that this table has foreign keys 
        // 

    });

module.exports = item_group;
