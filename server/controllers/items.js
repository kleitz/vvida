(function() {
  'use strict';
  module.exports = {
    create: function(req, res) {
      var Items = req.app.get('models').Items;
      Items.sync().then(function() {
        return Items.create({
          user_id: req.session.id,
          category_id: req.body.catId,
          name: req.body.itemName,
          description: req.body.description
        }).then(function(item) {
          if (!item) {
            res.status(500).send({
              error: 'Create item failed'
            });
          } else {
            res.json(item);
          }
        });
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    all: function(req, res) {
      var Items = req.app.get('models').Items;
      Items.findAll().then(function(item) {
        res.json(item);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    find: function(req, res) {
      var Items = req.app.get('models').Items;
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

    update: function(req, res) {
      var Items = req.app.get('models').Items;
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
            message: 'You have successfully edited your item'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    delete: function(req, res) {
      var Items = req.app.get('models').Items;
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
