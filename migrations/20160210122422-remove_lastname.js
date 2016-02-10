(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn('Users', 'lastname');
    },

    down: function(queryInterface, Sequelize) {

    }
  };
})();
