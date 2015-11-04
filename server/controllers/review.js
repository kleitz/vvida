(function() {
  'use strict';

  module.exports = {
    // Create Review Middleware
    create: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      Reviews.sync().then(function() {
        return Reviews.create({
          user_id: req.body.id,
          item_id: req.body.item_id,
          review: req.body.review,
          review_title: req.body.reviewTitle,
          rating: req.body.rating
        }).then(function(review) {
          if(!review) {
            res.status(500).send({
              error: 'Create review failed'
            });
          }
          else {
            res.json(review);
          }
        });
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to get all Reviews by a User
    all: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      Reviews.findAll().then(function(review) {
        res.json(review);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.error[0].message
        });
      });
    },

    // Middleware to update a Review
    update: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      return Reviews.update(req.body, {
        where: {
          review: req.body.review,
          review_title: req.body.reviewTitle
        }
      }).then(function(update) {
        if(!update) {
          res.status(500).send({
            error: 'Update failed'
          });
        } else {
          res.json({
            message: 'You have successfully updated your Review'
          })
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },



  }



})();