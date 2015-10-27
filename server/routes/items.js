// Items api
// this api will handle all the routes for items
(function() {
  'use strict';

  var Items = require('../controllers/items');

  module.exports = function(app) {

    app.route('/api/items')
      // create item route.
      .post(Items.create)
      .get(Items.all);

    app.route('/api/items/:id')
      // read items route
      .get(Items.find)
      // Update items route
      .put(Items.update)
      // Delete items route
      .delete(Items.delete);

  };
})();
