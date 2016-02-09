var moment = require('moment'),
  bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function(queryInterface) {
    /**
     * Add altering commands here.
     * Return a promise to correctly handle asynchronicity.
     * @param  queryInterface, Sequelize
     */
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'vvidaapp',
      password: bcrypt.hashSync('3at1ngYums@wh1leD0ingTh3Whip.c0m'),
      gender: 'Female',
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
