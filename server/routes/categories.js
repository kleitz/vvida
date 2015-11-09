var Categories = require('../controllers/categories');

module.exports = function(app) {
  app.route('/api/categories')
    .post(Categories.create)
    .get(Categories.getAll);
  app.route('/api/categories/:id')
    .get(Categories.find)
    .put(Categories.update)
    .delete(Categories.delete);

};
