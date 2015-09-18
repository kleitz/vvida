//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
  users = require('./users'),
  events = db.define('events', {
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

      // event name
      // hold the name of the events
      ev_name: {
        type: Seq.STRING,
        allowNull: false,
      },

      // description
      description: {
        type: Seq.TEXT,
        allowNull: true
      },

      // location of the event
      location: {
        type: Seq.TEXT,
        allowNull: false
      },

      // venue of the event
      venue: {
        type: Seq.TEXT,
        allowNull: false
      },

      // time
      time: {
        type: Seq.DATE,
        allowNull: false
      },

      // event sponsors
      sponsor: {
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

module.exports = events;
