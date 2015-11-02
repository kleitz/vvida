//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
  users = require('./users'),
  items = require('./items'),
  images = db.define('images', {
      // image url
      // hold the url of the images
      item_id: {
        type: Seq.INTEGER,
        allowNull: false,
        references: {
          model: items,
          key: 'id'
        }
      },

      public_id: {
        type: Seq.STRING,
        allowNull: false
      },

      img_url: {
        type: Seq.STRING,
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

module.exports = images;
