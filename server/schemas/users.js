//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../db-connect'),
    users = db.define('users', {
        
        //username
        username: {
            type: Seq.STRING,
            allowNull: false,
            unique: true
        },
        //password
        password: {
            type: Seq.STRING,
            allowNull: false,
            unique: true
        },
        // firstname
        firstname: {
            type: Seq.STRING,
            allowNull: false
        },
        // lastname
        lastname: {
            type: Seq.STRING,
            allowNull: false
        },
        gender: {
            type: Seq.ENUM,
            values:['male','female']
        },
        // date of birth
        dob: {
            type: Seq.INTEGER,
            allowNull: true
        },
        // email
        email: {
            type: Seq.STRING,
            allowNull: false
        },
        // country
        country: {
            type: Seq.STRING,
            allowNull: false
        },
        // city
        city: {
            type: Seq.STRING,
            allowNull: false
        },
        // role
        role: {
            type: Seq.ENUM,
            values: ['user', 'admin', 'super-admin'],
            allowNull: false
        },
        // status
        status: {
            type: Seq.ENUM,
            values: ['active', 'innactive'],
            allowNull: false
        },

        // enabled
        // gives options to enable or disable user

        enabled: { 
            type: Seq.ENUM,
            values: ['yes', 'no']
            // to be clarified
        }
    });

module.exports = users;
