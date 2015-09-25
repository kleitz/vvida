//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
  users = db.define('users', {

      //username
      username: {
        type: Seq.STRING,
        unique: true,
      },
      //password
      password: {
        type: Seq.STRING,
        unique: true
      },
      // firstname
      firstname: {
        type: Seq.STRING,
        validate: {
          isAlpha: true
        }
      },
      // lastname
      lastname: {
        type: Seq.STRING,
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
        validate: {
          isEmail: true
        }
      },
      // country
      country: {
        type: Seq.STRING,
      },
      // city
      city: {
        type: Seq.STRING,
      },
      // role
      role: {
        type: Seq.ENUM,
        values: ['user', 'admin', 'super-admin'],
      },
      // status
      status: {
        type: Seq.ENUM,
        values: ['active', 'innactive'],
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
