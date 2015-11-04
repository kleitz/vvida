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
  }



})();