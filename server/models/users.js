module.exports = function(sequelize, DataType) {
  return sequelize.define('Users', {
      // username
      username: {
        type: DataType.STRING,
        unique: true,
      },
      // password
      password: {
        type: DataType.STRING,
        unique: true,
        allowNull: true,
      },
      // firstname
      firstname: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          isAlpha: true
        }
      },
      // lastname
      lastname: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          isAlpha: true
        }
      },
      gender: {
        type: DataType.STRING,
        validate: {
          isIn: {
            args: ['male', 'female', 'hidden'],
            msg: 'Must be either male, female or hidden'
          }
        },
        allowNull: false,
        defaultValue: 'hidden'
      },
      // date of birth
      dob: {
        type: DataType.DATE,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      // email
      email: {
        type: DataType.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // country
      country: {
        type: DataType.STRING,
        allowNull: true,
      },
      // city
      city: {
        type: DataType.STRING,
        allowNull: true,
      },
      // role
      role: {
        type: DataType.STRING,
        validate: {
          isIn: {
            args: ['user', 'admin', 'super-admin'],
            msg: 'Must be either user, admin or super-admin.'
          }
        },
        allowNull: false,
        defaultValue: 'user'
      },
      // status
      status: {
        type: DataType.ENUM,
        values: ['active', 'innactive'],
        defaultValue: 'active'
      },
      // facebook and google IDs of the user
      facebook_auth_id: {
        type: DataType.STRING,
        allowNull: true,
      },
      // Access token for facebook
      facebook_auth_token: {
        type: DataType.STRING,
        allowNull: true,
      },
      google_auth_id: {
        type: DataType.STRING,
        allowNull: true,
      },
      // Access token for Google
      google_auth_token: {
        type: DataType.STRING,
        allowNull: true,
      },
      // Profile image
      picture_url: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: 'images/user.png'
      },
      // JWT token
      token: {
        type: DataType.STRING(1024),
        allowNull: true,
      },
      // enabled
      // gives options to enable or disable user
      enabled: {
        type: DataType.STRING,
        validate: {
          isIn: {
            args: ['yes', 'no'],
            msg: 'Must be yes or no'
          }
        },
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
    }
  );
};
