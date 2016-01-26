module.exports = function(app, auth) {
  var Users = require('../controllers/users')(app);
  jwt = require('jsonwebtoken'),

  //logout route
  app.route('/api/users/logout')
    .get(Users.logout);

  app.route('/api/users/session')
    .get(Users.session);

  function userMiddleware(req, res, next){
  req.user.token = jwt.sign(req.user, app.get('superSecret'), {
        expireIn: 180
      });
  req.session.user = req.user;
  console.log(req.session, "session");
  next();
}
   // login with email
  app.route('/api/users/login')
    .post(Users.login);

  app.get('/items/profile', userMiddleware, function(req, res, next) {
    console.log(req.user);
    next();
  })

  // users routes
  app.route('/api/users')
    .get(Users.all)
    .post(Users.signup);

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