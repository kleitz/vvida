(function() {
  'use strict';
  module.exports = function(app) {
    var Categories = app.get('models').Categories,
      Images = app.get('models').Images,
      Reviews = app.get('models').Reviews;

    return {
      //Middleware to create a category
      create: function(req, res) {
        return Categories.create({
          name: req.body.name,
          type: req.body.category
        }).then(function(category) {
          if (!category) {
            res.status(404).send({
              error: 'Category not created!'
            });
          } else {
            res.status(200).json(category);
          }
        }).catch(function(err) {
          res.status(401).send({
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
          if (category.length === 0) {
            res.status(404).json({
              success: false,
              message: 'Category(ies) not found!'
            });
          } else {
            res.status(200).json(category);
          }
        }).catch(function(err) {
          return res.status(500).send({
            message: 'Error retrieving category(ies)',
            error: err
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
        }).then(function(categoryItems) {
          if (!categoryItems) {
            res.status(404).json({
              success: false,
              message: 'Category not found!'
            });
          } else {
            res.json(categoryItems);
          }
        }).catch(function(err) {
          return res.status(500).send({
            message: 'Error retrieving category',
            error: err
          });
        });
      },

      // Middleware to delete a category
      delete: function(req, res) {
        return Categories.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ok) {
          if (!ok) {
            res.status(500).send({
              error: 'Delete failed'
            });
          } else {
            res.status(200).send({
              message: 'Delete successful'
            });
          }
        }).catch(function(err) {
          res.send({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();
