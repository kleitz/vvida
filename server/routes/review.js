var Reviews = require('../controllers/review');
module.exports = function(app, auth) {
  app.route('/api/reviews')
    .post(auth.authenticate, Reviews.create)
    .get(Reviews.all);

  app.route('/api/reviews/:id')
    .get(Reviews.find)
    .put(auth.authenticate, Reviews.update)
    .delete(auth.authenticate, Reviews.delete);
};
