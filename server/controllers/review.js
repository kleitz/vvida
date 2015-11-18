(function() {
  'use strict';

  module.exports = {
    create: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      return Reviews.create({
        user_id: req.body.id,
        item_id: req.body.itemId,
        review: req.body.review,
        rating: req.body.rating
      }).then(function(review) {
        if (!review) {
          res.status(500).send({
            error: 'Create review failed'
          });
        } else {
          res.json(review);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    all: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
<<<<<<< HEAD
      Reviews.findAll().then(function(reviews, err) {
        if (!reviews) {
          res.status(404).send({
            error: 'Reviews not found'
          });
        } else if (err) {
          res.status(500).send({
            message: 'Error retrieving reviews',
            error: err
          });
        } else {
          res.json(reviews);
        }
=======
      Reviews.findAll({
        limit: 3,
        order: [
          ['id', 'DESC']
        ]
      }).then(function(review) {
        res.json(review);
>>>>>>> develop
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.error[0].message
        });
      });
    },

    update: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      return Reviews.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(update) {
        if (!update) {
          res.status(500).send({
            error: 'Update failed'
          });
        } else {
          res.json({
            message: 'You have successfully updated your Review'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    delete: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      Reviews.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        } else {
          res.send({
            message: 'Review deleted succesfully'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    find: function(req, res) {
      var Reviews = req.app.get('models').Reviews;
      return Reviews.find({
        where: {
          id: req.params.id
        }
      }).then(function(review) {
        if (!review) {
          res.status(404).send({
            message: 'Review not found'
          });
        } else {
          res.json(review);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    }
  };
})();
