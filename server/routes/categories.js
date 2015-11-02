// Items api
// this api will handle all the routes for items
(function() {
  'use strict';
  var Categories = require('../controllers/categories');
  module.exports = function(app) {

    app.route('/api/categories')
      // create item route.
      .post(Categories.create)
      .get(Categories.all);
    app.route('/api/categories/:id')
      .delete(Categories.delete);

  };
})();
