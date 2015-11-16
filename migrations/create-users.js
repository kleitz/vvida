(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Users', {

          // username
          username: {
            type: Sequelize.STRING,
            unique: true,
          },
          // password
          password: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
          },
          // firstname
          firstname: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
              isAlpha: true
            }
          },
          // lastname
          lastname: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
              isAlpha: true
            }
          },
          gender: {
            type: Sequelize.ENUM,
            values: ['male', 'female', 'hidden'],
            defaultValue: 'hidden'
          },
          // date of birth
          dob: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
              isDate: true
            }
          },
          // email
          email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          // country
          country: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          // city
          city: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          // role
          role: {
            type: Sequelize.ENUM,
            values: ['user', 'admin', 'super-admin'],
            defaultValue: 'user'
          },
          // status
          status: {
            type: Sequelize.ENUM,
            values: ['active', 'innactive'],
            defaultValue: 'active'
          },

          // facebook and google IDs of the user
          facebook_auth_id: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          // Access token for facebook
          facebook_auth_token: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          google_auth_id: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          // Access token for Google
          google_auth_token: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          picture_url: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'images/user.png'
          },
          token: {
            type: Sequelize.STRING(1024),
            allowNull: true,
          },
          // enabled
          // gives options to enable or disable user
          enabled: {
            type: Sequelize.ENUM,
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
          underscored: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },
    down: function(queryInterface) {
      return queryInterface.dropTable('Users');
    }
  };
})();
