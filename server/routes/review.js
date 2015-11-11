var Reviews = require('../controllers/review');

module.exports = function(app) {
  app.route('/api/reviews')
    .post(Reviews.create)
    .get(Reviews.all);
  app.route('/api/reviews/:id')
    .get(Reviews.find)
    .put(Reviews.update)
    .delete(Reviews.delete);
};
