(function() {
  'use strict';
  // events api
  // this api will handle all the routes for events
  module.exports = function(app, auth) {
    var Events = require('../controllers/events')(app);

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

})();
