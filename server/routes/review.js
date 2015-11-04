var Reviews = require('../controllers/review');

module.exports = function(app){
  app.route('/api/review')
    .post(Reviews.create)
    .get(Reviews.all)
    .put(Reviews.update)
};