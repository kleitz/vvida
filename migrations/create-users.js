(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Users', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          // username
          username: {
            type: Sequelize.STRING,
            unique: false
          },
          // password
          password: {
            type: Sequelize.STRING,
            allowNull: true
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
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['male', 'female', 'hidden']
                ],
                msg: 'Must be either male, female or hidden'
              }
            },
            allowNull: true,
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
            allowNull: true
          },
          // role
          role: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['user', 'admin', 'super-admin']
                ],
                msg: 'Must be either user, admin or super-admin.'
              }
            },
            allowNull: false,
            defaultValue: 'user'
          },
          // status
          status: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['active', 'inactive']
                ],
                msg: 'Must be either active or inactive'
              }
            },
            defaultValue: 'active'
          },

          // facebook and google IDs of the user
          facebook_auth_id: {
            type: Sequelize.STRING,
            allowNull: true
          },

          // Access token for facebook
          facebook_auth_token: {
            type: Sequelize.STRING,
            allowNull: true
          },

          google_auth_id: {
            type: Sequelize.STRING,
            allowNull: true
          },

          // Access token for Google
          google_auth_token: {
            type: Sequelize.STRING,
            allowNull: true
          },
          public_id: {
            type: DataType.STRING,
            allowNull: true
          },
          img_url: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: 'images/user.png'
          },
          // JWT token
          token: {
            type: DataType.STRING(1024),
            allowNull: true
          },
          // enabled
          // gives options to enable or disable user
          enabled: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['yes', 'no']
                ],
                msg: 'Must be yes or no'
              }
            },
            // to be clarified
            defaultValue: 'yes'
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
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
          // prevent time stamps from using camelcase
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // dont forget to enable timestamps
          timestamps: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },
    down: function(queryInterface) {
      return queryInterface.dropTable('Users');
    }
  };
})();
