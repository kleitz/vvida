var Categories = require('../controllers/categories');

module.exports = function(app) {
  app.route('/api/categories').post(Categories.create);
};