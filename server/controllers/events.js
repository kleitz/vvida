(function() {

  'use strict';
  var Events = require('../models/events');
  module.exports = {
    // Create event middlware
    create: function(req, res) {
      Events.sync().then(function() {
        return Events.create({
          user_id: req.session.id,
          ev_name: req.body.eventName,
          description: req.body.description,
          location: req.body.location,
          venue: req.body.venue,
          time: req.body.time,
          sponsor: req.body.sponsor
        }).then(function(event, err) {
          if (!event) {
            res.status(500).send({
              error: 'Create event failed'
            });
          } else if (err) {
            res.status(500).send({
              error: 'Error creating event'
            });
          } else {
            res.json(event);
          }
        });
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to get all the events

    all: function(req, res) {
      Events.findAll().then(function(event, err) {
        if (event) {
          res.json(event);
        } else if (err) {
          res.status(500).send({
            error: 'Error retrieving events'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middlware to get event by id
    find: function(req, res) {
      return Events.find({
        where: {
          id: req.params.id
        }
      }).then(function(event) {
        if (!event) {
          res.status(404).send({
            message: 'Event not found'
          });
        } else if (err) {
          res.status(500).send({
            message: 'Error retrieving event',
            error: err
          });
        } else {
          res.json(event);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },
    // Middlware to  update events
    update: function(req, res) {
      return Events.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: 'Update failed'
          });
        } else {
          res.json({
            isUpdate: true,
            message: 'You have successfully Edited Your event'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message

        });
      });
    },

    // Middleware to delete an event
    delete: function(req, res) {
      return Events.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: 'Delete failed'
          });
        } else {
          res.status(200).send({
            message: 'Delete successful'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    }
  };

})();
