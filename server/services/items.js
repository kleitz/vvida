(function() {
  'use strict';

  var Items = require('../schemas/items'); << << << < HEAD
  module.exports = {
    //Middleware to create an item
    create: function(req, res, next) {
      console.log("this is it" + req);
      return Items.create({
        user_id: req.params.id,
        cat_id: req.body.catId,
        item_name: req.body.itemName,
        item_desc: req.body.description
      }).then(function(item) {
        if (!item) {
          res.status(500).send({
            error: 'Create item failed'
          });
        } else {
          req.item = item;
          next();
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to get all items
    all: function(req, res) {
      Items.findAll().then(function(item) {
        res.json(item);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to get an item by id
    find: function(req, res) {
      return Items.find({
        where: {
          id: req.params.id
        }
      }).then(function(item) {
        if (!item) {
          res.status(404).send({
            message: 'Item not found'
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

    // Middleware to update an item
    update: function(req, res) {
      return Items.update(req.body, {
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
            isUpdate: true,
            message: 'You have successfully edited your item'
          });
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
