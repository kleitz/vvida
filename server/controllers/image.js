(function() {
  'use strict';
  var Items = require('../models/items');
  module.exports = {
    //Middleware to create an item
    create: function(req, res, next) {
      return Items.create({
        user_id: req.params.id,
        cat_id: item.catId,
        item_name: item.name,
        item_desc: item.description
      }).then(function(item) {
        if (!item) {
          res.status(500).send({
            error: 'Create item failed'
          });
        } else {
          res.json(item);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to delete an item
    delete: function(req, res) {
      return Items.destroy({
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
