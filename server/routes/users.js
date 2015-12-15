var Users = require('../controllers/users');
module.exports = function(app, auth) {
  // login with email
  app.route('/api/users/login')
    .post(Users.login);

  // logout route
  app.route('/api/users/logout')
    .get(auth.authenticate, Users.logout);

  app.route('/api/users/session')
    .get(auth.authenticate, Users.session);

  // users routes
  app.route('/users')
    .get(Users.all)
    .post(Users.signup);

  // user email update route
  app.route('/api/users/:id')
    .get(Users.find)
    .put(auth.authenticate, Users.update)
    .delete(auth.authenticate, Users.delete);

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
