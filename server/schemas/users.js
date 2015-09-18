//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
  users = db.define('users', {

      //username
      username: {
        type: Seq.STRING,
        allowNull: false,
        unique: true,
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
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      // lastname
      lastname: {
        type: Seq.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      gender: {
        type: Seq.ENUM,
        values: ['male', 'female']
      },
      // date of birth
      dob: {
        type: Seq.INTEGER,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      // email
      email: {
        type: Seq.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
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
    },
    // table configuration
    {
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscore: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    }
  );

module.exports = users;
