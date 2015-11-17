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
  app.route('/api/users')
    .get(Users.all)
    .post(Users.signup);

  // user email update route
  app.route('/api/users/:id')
    .get(Users.find)
    .put(auth.authenticate, Users.update)
    .delete(auth.authenticate, Users.delete);
};
