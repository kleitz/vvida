var Users = require('../controllers/users');

module.exports = function(app) {
  // Authenticate user session dependent API routes
  //app.use(Users.authenticate);

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

  app.get('/api/countries', Users.countries);

};
