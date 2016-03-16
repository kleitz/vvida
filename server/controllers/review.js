(function() {
  'use strict';

  module.exports = function(app) {
    var Reviews = app.get('models').Reviews;

    return {
      create: function(req, res) {
        Reviews.create({
          user_id: req.decoded.id,
          item_id: req.body.itemId,
          event_id: req.body.eventId,
          review: req.body.review,
          review_title: req.body.review_title,
          rating: req.body.rating
        }).then(function(review) {
          res.json(review);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      all: function(req, res) {
        Reviews.findAll({
          limit: 3,
          order: [
            ['id', 'DESC']
          ]
        }).then(function(review) {
          res.json(review);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Reviews.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'You have successfully updated your Review'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Reviews.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Review deleted succesfully'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        Reviews.find({
          where: {
            id: req.params.id
          }
        }).then(function(review) {
          if (!review) {
            res.status(404).json({
              error: 'Review not found'
            });
          } else {
            res.json(review);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();
