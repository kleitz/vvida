//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    countries = db.define('countries', {
            country: {
                type: Seq.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true
                }
            },

        },
        // table configuration
        {
            // prevent time stamps from using camelase
            // updatedAt to updated_at and createdAt to created-at
            underscore: true,
            // prevent sequelize from transforming the user tables to prural
            freezetableName: true,
        });

module.exports = countries;
