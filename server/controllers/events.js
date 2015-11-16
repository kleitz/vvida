(function() {

  'use strict';

  module.exports = {
    // Create event middlware
    create: function(req, res) {
      var Events = req.app.get('models').Events;
      Events.create({
        user_id: req.decoded.id,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        venue: req.body.venue,
        time: req.body.time,
        sponsor: req.body.sponsor
      }).then(function(event) {
        if (!event) {
          res.status(500).send({
            error: 'Create event failed'
          });
        } else {
          res.json(event);
        }
      });
    },

    // Middleware to get all the events

    all: function(req, res) {
      var Events = req.app.get('models').Events;
      Events.findAll().then(function(event, err) {
        if (err) {
          return res.status(500).send({
            error: 'Error retrieving events'
          });
        }

        if (event) {
          res.json(event);
        }
      });
    },

    // Middlware to get event by id
    find: function(req, res) {
      var Events = req.app.get('models').Events;
      Events.find({
        where: {
          id: req.params.id
        }
      }).then(function(event) {
        if (!event) {
          return res.status(404).send({
            message: 'Event not found'
          });
        }

        res.json(event);
      }).catch(function(err) {
        return res.status(500).send({
          message: 'Error retrieving event',
          error: err
        });
      });
    },
    // Middlware to  update events
    update: function(req, res) {
      var Events = req.app.get('models').Events;
      Events.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          return res.status(500).send({
            error: 'Update failed'
          });
        }

        res.json({
          isUpdate: true,
          message: 'You have successfully Edited Your event'
        });
      });
    },

    // Middleware to delete an event
    delete: function(req, res) {
      var Events = req.app.get('models').Events;
      Events.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          return res.status(500).send({
            error: 'Delete failed'
          });
        }

        res.status(200).send({
          message: 'Delete successful'
        });
      });
    }
  };

})();
