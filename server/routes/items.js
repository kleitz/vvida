// Items api
// this api will handle all the routes for items
(function() {
  'use strict';
  var Item = require('../controllers/items');
  module.exports = function(app) {

    app.route('/api/items')
      // create item route.
      .post(Item.create)
      .get(Item.all);

    app.route('/api/items/:id')
      // read items route
      .get(Item.find)
      // Update items route
      .put(Item.update)
      // Delete items route
      .delete(Item.delete);
  };
})();
