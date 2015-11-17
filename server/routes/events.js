// events api
// this api will handle all the routes for events
var Events = require('../controllers/events');

module.exports = function(app, auth) {
  app.route('/api/events')
    // create event route.
    .post(auth.authenticate, Events.create)
    // get all events
    .get(Events.all);

  app.route('/api/events/:id')
    // read events route
    .get(Events.find)
    // Update events route
    .put(auth.authenticate, Events.update)
    // Delete events route
    .delete(auth.authenticate, Events.delete);
};
