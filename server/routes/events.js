// events api
// this api will handle all the routes for events
var Event = require('../services/events');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(Event.createEvent)
    .get(Event.getAllEvents);

  app.route('/api/events/:id')
    // read events route
    .get(Event.getEventById)
    // Update events route
    .put(Event.updateEvent)
    // Delete events route
    .delete(Event.deleteEvent);
};
