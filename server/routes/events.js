// events api
// this api will handle all the routes for events

var Events = require('../schemas/events');

module.exports = function(app, config) {

  app.route('/api/events')
    .get(function(req, res) {
      Events.findAll().then(function(event) {
        if (!event) {
          res.status(404).send('events not found');
        } else {
          res.json(event);
        }
      });
    });

  app.route('/api/events/:id')
    // create event route.
    .post(function(req, res) {
      Events.sync().then(function() {
        return Events.create({
          user_id: req.params.id,
          ev_name: req.body.eventName,
          description: req.body.description,
          location: req.body.location,
          venue: req.body.venue,
          time: req.body.time,
          sponsor: req.body.sponsor
        }).then(function(event) {
          if (!event) {
            res.json({
              isCreated: false,
              message: "Event was not created"
            });
          } else {
            res.json(event);
          }
        });
      });
    })

  // read events route
  .get(function(req, res) {
    return Events.findAll({
      where: {
        user_id: req.params.id
      }
    }).then(function(event) {
      if (!event) {
        res.status(404).send('event not found');
      } else {
        res.json(event);
      }
    });
  })

  // Update events route
  .put(function(req, res) {
    console.log(req.body);
    return Events.update(req.body, {
      where: {
        user_id: req.params.id
      }
    }).then(function(update) {
      if(!update) {
        res.status(500).send('update failed');
      } else {
        res.json({
          isUpdate: true,
          message: "You have successfully Edited Your profile"
        });
      }
    });
  })

  // Delete events route
  .delete(function(req, res) {
    return Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(event) {
      if(!event) {
        res.status(500).send('You have successfully deleted your event');
      } else {
        res.json({
          isDelete: true,
          message: 'Delete successful'
        });
      }
    });
  });

};
