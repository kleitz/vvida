var Items = require('../schemas/items'),
  itemService;

(function() {

  'use strict';
  itemService = {
    createItem: function(req, res) {
      Items.sync().then(function() {
        return Items.create({
          user_id: req.session.id,
          cat_id: req.body.catId,
          item_name: req.body.itemName,
          item_desc: req.body.description
        }).then(function(item) {
          if (!item) {
            res.status(500).send({
              error: 'Create item failed'
            });
          } else {
            res.json(item);
          }
        });
      });
    },
    getAllItems: function(req, res) {
      Items.findAll().then(function(item) {
        res.json(item);
      });
    },
    getItemById: function(req, res) {
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
      });
    },
    updateItem: function(req, res) {
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
      });
    },
    deleteItem: function(req, res) {
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
          console.log(ok);
          res.status(200).send({
            message: 'Delete successful'
          });
        }
      });
    }
  };
})();
module.export(itemService);
