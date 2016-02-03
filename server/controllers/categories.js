(function() {
  'use strict';
  module.exports = function(app) {
    var Categories = app.get('models').Categories,
      Items = app.get('models').Items,
      Images = app.get('models').Images,
      Reviews = app.get('models').Reviews;




    return {
      //Middleware to create an item
      create: function(req, res) {
        return Categories.create({
          type: req.body.category
        }).then(function(category) {
          if (!category) {
            res.status(500).send({
              error: 'Create category failed'
            });
          } else {
            res.json(category);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all items
      all: function(req, res) {
        Categories.findAll({
          where: {
            type: req.query.type
          }
        }).then(function(category) {
          res.json(category);
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        Categories.find({
          where: {
            id: req.params.id
          },
          include: [{
            model: Items,
            include: [Images, Reviews]
          }]
        }).then(function(categoryItems) {
          res.json(categoryItems);
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },
      // Middleware to delete an item
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
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      }
    };

  };

})();