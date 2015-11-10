// events api
// this api will handle all the routes for events
var Events = require('../controllers/events'),
  Users = require('../controllers/users');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(Users.authenticate, Events.create)
    .get(Events.all);

  app.route('/api/events/:id')
    // read events route
    .get(Events.find)
    // Update events route
    .put(Users.authenticate, Events.update)
    // Delete events route
    .delete(Users.authenticate, Events.delete);
};
