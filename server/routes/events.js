// events api
// this api will handle all the routes for events
var eventService = require('../services/events');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(eventService.createEvent)
    .get(eventService.getAllEvents);

  app.route('/api/events/:id')
    // read events route
    .get(eventService.getEventById)
    // Update events route
    .put(eventService.updateEvent)
    // Delete events route
    .delete(eventService.deleteEvent);


};
