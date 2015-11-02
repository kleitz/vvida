(function() {
  'use strict';
  var Category = require('../models/categories');
  module.exports = {
    //Middleware to create an item
    create: function(req, res) {
      return Category.create({
        cat_type: req.body.category,
        is_sub_cat: req.body.subCat
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
      Category.findAll().then(function(category) {
        res.json(category);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },
    // Middleware to delete an item
    delete: function(req, res) {
      return Category.destroy({
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

})();
