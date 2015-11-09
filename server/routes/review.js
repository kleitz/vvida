var Reviews = require('../controllers/review');

module.exports = function(app) {
  app.route('/api/review')
    .post(Reviews.create)
    .get(Reviews.all);
  app.route('/api/review/:id')
    .get(Reviews.find)
    .put(Reviews.update)
    .delete(Reviews.delete);
};
