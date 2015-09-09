//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    countries = db.define('countries', {
        country: {
            type: Seq.STRING,
            allowNull: false
        }
    });

module.exports = countries;
