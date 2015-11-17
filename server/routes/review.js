var Reviews = require('../controllers/review');

module.exports = function(app, config, auth) {
  app.route('/api/review')
    .post(auth.authenticate, Reviews.create)
    .get(Reviews.all);

  app.route('/api/review/:id')
    .get(Reviews.find)
    .put(auth.authenticate, Reviews.update)
    .delete(auth.authenticate, Reviews.delete);
};
