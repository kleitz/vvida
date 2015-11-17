var Countries = require('../controllers/countries');

module.exports = function(app) {
  app.route('/api/countries')
    .get(Countries.getCountries);
};
