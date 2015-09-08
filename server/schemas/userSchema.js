//var require the seqalize module
var Sequelize = require('sequelize');
// require the db connection
var sequelize = require('./dbconnect');


// define the user model

module.exports = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    //username
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    //password
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    // firstname
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // lastname
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // date of birth
    dob: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // email
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // country
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // city
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // role
    role: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // status
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
