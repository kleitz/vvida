(function() {

  'use strict';
  module.exports = function(app) {
    var Categories = app.get('models').Categories,
      Images = app.get('models').Images,
      Reviews = app.get('models').Reviews;

    return {
      //Middleware to create a category
      create: function(req, res) {
        Categories.create({
          name: req.body.name,
          type: req.body.category
        }).then(function(category) {
            res.json(category);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all categories
      all: function(req, res) {
        Categories.findAll({
          where: {
            type: req.query.type
          }
        }).then(function(category) {
            res.json(category);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      //middleware to get a category
      find: function(req, res) {
        Categories.find({
          where: {
            id: req.params.id,
          },
          include: [{
            model: app.get('models')[req.query.model],
            include: [Images, Reviews]
          }]
        }).then(function(category) {
          if (!category) {
            res.status(404).json({
              error: 'Category not found!'
            });
          } else {
            res.json(category);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to delete a category
      delete: function(req, res) {
        Categories.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
            res.json({
              message: 'Delete successful'
            });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();
