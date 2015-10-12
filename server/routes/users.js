var userService = require('../services/users');

module.exports = function(app) {
  // login with email
  app.route('/api/users/login')
    .post(userService.logIn);

  // users routes
  app.route('/api/users')
    .get(userService.getAllUsers)
    .post(userService.signUp);

  // user email update route
  app.route('/api/users/:id')
    .get(userService.getUserById)
    .put(userService.updateUser)
    .delete(userService.deleteUser);
};
