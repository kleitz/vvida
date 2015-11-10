// events api
// this api will handle all the routes for events
var Events = require('../controllers/events');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(Events.create)
    .get(Events.all);

  app.route('/api/events/:id')
    // read events route
    .get(Events.find)
    // Update events route
    .put(Events.update)
    // Delete events route
    .delete(Events.delete);
};
