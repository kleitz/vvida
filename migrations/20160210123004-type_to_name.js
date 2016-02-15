(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.renameColumn('Categories', 'type', 'name');
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();
