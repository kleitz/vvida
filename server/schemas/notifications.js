//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
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

module.exports = notifications;
