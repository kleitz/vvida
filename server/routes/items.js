// Items api
// this api will handle all the routes for items
(function() {
  'use strict';

  var itemService = require('../services/items'),
  upload = require('../services/upload');

  module.exports = function(app) {

    app.route('/api/items/:id')
      // create item route.
      .post(upload.image, itemService.createItem)
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
