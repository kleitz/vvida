// Items api
// this api will handle all the routes for items
(function() {
  'use strict';
  var Categories = require('../services/categories');
  module.exports = function(app) {

    app.route('/api/items')
      // create item route.
      .post(Categories.delete.create)
      .get(Categories.delete.all)
      .delete(Categories.delete);

  };
})();
