var Users = require('../controllers/users');

module.exports = function(app) {
  // // Authenticate user session dependent API routes
  // app.use(Users.authenticate);

  // login with email
  app.route('/api/users/login')
    .post(Users.login);

  // logout route
  app.route('/api/users/logout').get(Users.logout);
  // users routes
  app.route('/api/users')
    .get(Users.all)
    .post(Users.signup);

  app.get('/api/users/session', Users.session);

  // user email update route
  app.route('/api/users/:id')
    .get(Users.find)
    .put(Users.update)
    .delete(Users.delete);

  app.route('/api/users/:id/items')
    .get(Users.getItems);

  app.route('/api/users/:id/items/no')
    .get(Users.getItemsCount);

  app.route('/api/users/:id/reviews')
    .get(Users.getReviews);

  app.route('/api/users/:id/reviews/no')
    .get(Users.getReviewsCount);

  app.route('/api/users/:id/events')
    .get(Users.getEvents);

  app.route('/api/users/:id/events/no')
    .get(Users.getEventsCount);

};
