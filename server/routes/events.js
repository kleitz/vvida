// events api
// this api will handle all the routes for events
var event = require('../services/events');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(event.createEvent)
    .get(event.getAllEvents);

  app.route('/api/events/:id')
    // read events route
    .get(event.getEventById)
    // Update events route
    .put(event.updateEvent)
    // Delete events route
    .delete(event.deleteEvent);
};
