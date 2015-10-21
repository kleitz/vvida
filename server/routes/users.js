var Users = require('../services/users');

module.exports = function(app) {
  // login with email
  app.route('/api/users/login')
    .post(Users.logIn);

  // logout route
  app.route('/api/users/logout').get(Users.logout);
  // users routes
  app.route('/api/users')
    .get(Users.getAllUsers)
    .post(Users.signUp);

  app.get('/api/users/session', Users.getSession);

  // user email update route
  app.route('/api/users/:id')
    .get(Users.getUserById)
    .put(Users.updateUser)
    .delete(Users.deleteUser);
};
