//var require the seqalize module
var Seq = require('sequelize'),
  db = require('../config/db-connect'),
  users = db.define('users', {

      // username
      username: {
        type: Seq.STRING,
        unique: true,
      },
      // password
      password: {
        type: Seq.STRING,
        unique: true,
        allowNull: true,
      },
      // firstname
      firstname: {
        type: Seq.STRING,
        allowNull: true,
        validate: {
          isAlpha: true
        }
      },
      // lastname
      lastname: {
        type: Seq.STRING,
        allowNull: true,
        validate: {
          isAlpha: true
        }
      },
      gender: {
        type: Seq.ENUM,
        values: ['male', 'female', 'hidden'],
        defaultValue: 'hidden'
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
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // country
      country: {
        type: Seq.STRING,
        allowNull: true,
      },
      // city
      city: {
        type: Seq.STRING,
        allowNull: true,
      },
      // role
      role: {
        type: Seq.ENUM,
        values: ['user', 'admin', 'super-admin'],
        defaultValue: 'user'
      },
      // status
      status: {
        type: Seq.ENUM,
        values: ['active', 'innactive'],
        defaultValue: 'active'
      },

      // facebook and google IDs of the user
      facebook_auth_id: {
        type: Seq.STRING,
        allowNull: true,
      },

      // Access token for facebook
      facebook_auth_token: {
        type: Seq.STRING,
        allowNull: true,
      },

      google_auth_id: {
        type: Seq.STRING,
        allowNull: true,
      },

      // Access token for Google
      google_auth_token: {
        type: Seq.STRING,
        allowNull: true,
      },

      // enabled
      // gives options to enable or disable user

      enabled: {
        type: Seq.ENUM,
        values: ['yes', 'no'],
        // to be clarified
        defaultValue: 'yes'
      }
    },
    // table configuration
    {
      instanceMethods: {
        getFullName: function() {
          return [this.firstname, this.lastname].join(' ');
        },
        setFullName: function(value) {
          var names = value.split(' ');
          this.setDataValue('firstname', names.slice(0, -1).join(' '));
          this.setDataValue('lastname', names.slice(-1).join(' '));
          return this;
        },
      },
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscore: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    }
  );

module.exports = users;
