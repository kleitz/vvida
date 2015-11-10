var Categories = require('../controllers/categories');

module.exports = function(app, auth) {
  app.route('/api/categories')
    .post(auth.authenticate, Categories.create)
    .get(Categories.getAll);

  app.route('/api/categories/:id')
    .get(Categories.find)
    .put(auth.authenticate, Categories.update)
    .delete(auth.authenticate, Categories.delete);
};
