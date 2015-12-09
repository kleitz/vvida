(function() {
  'use strict';

  module.exports = function(app, auth) {
    var Categories = require('../controllers/categories')(app);
    app.route('/api/categories')
      .post(auth.authenticate, Categories.create)
      .get(Categories.all);

    app.route('/api/categories/:id')
      // .get(Categories.find)
      // .put(auth.authenticate, Categories.update)
      .delete(auth.authenticate, Categories.delete);
  };

})();
