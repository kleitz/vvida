var moment = require('moment'),
  bcrypt = require('bcrypt-nodejs');
  
module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
    return queryInterface.bulkInsert('Users', [{
      username: 'vvidaapp',
      password: bcrypt.hashSync('3at1ngYums@wh1leD0ingTh3Whip.c0m'),
      gender: 'female',
      email: 'vvidaapp@gmail.com',
      created_at: moment().utc().format(),
      updated_at: moment().utc().format()
    }], {});
  },

  down: function(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkDelete('Users', null, {});
  }
};
