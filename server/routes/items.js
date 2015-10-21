// Items api
// this api will handle all the routes for items
(function() {
  'use strict';

  var itemService = require('../services/items');

  module.exports = function(app) {

    app.route('/api/items')
      // create item route.
      .post(itemService.createItem)
      .get(itemService.getAllItems);

    app.route('/api/items/:id')
      // read items route
      .get(itemService.getItemById)
      // Update items route
      .put(itemService.updateItem)
      // Delete items route
      .delete(itemService.deleteItem);

  };
})();