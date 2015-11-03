// Items api
// this api will handle all the routes for items
(function() {
  'use strict';

  var Items = require('../controllers/items'),
    Users = require('../controllers/users');

  module.exports = function(app) {

    app.route('/api/items')
      // create item .
      .post(Users.authenticate, Items.create)
      .get(Items.all);

    app.route('/api/items/:id')
      // read items
      .get(Items.find)
      // Update items
      .put(Users.authenticate, Items.update)
      // Delete items
      .delete(Users.authenticate, Items.delete);

  };
})();
