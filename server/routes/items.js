(function() {
  'use strict';
  // Items api
  // this api will handle all the routes for items
  var Items = require('../controllers/items');
  module.exports = function(app, auth) {

    app.route('/api/items')
      // create item .
      .post(auth.authenticate, Items.create)
      .get(Items.all);

    app.route('/api/items/:id')
      // read items
      .get(Items.find)
      // Update items
      .put(auth.authenticate, Items.update)
      // Delete items
      .delete(auth.authenticate, Items.delete);

  };

})();
