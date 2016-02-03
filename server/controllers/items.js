(function() {
  'use strict';
  module.exports = function(app) {
    var Items = app.get('models').Items,
      Images = app.get('models').Images,
      Categories = app.get('models').Categories,
      Reviews = app.get('models').Reviews,
      Users = app.get('models').Users;

    return {
      create: function(req, res) {
        if (req.body.hasOwnProperty('name') &&
          req.body.hasOwnProperty('description')) {
          Items.create({
              user_id: req.decoded.id,
              category_id: req.body.category_id,
              name: req.body.name,
              city: req.body.city,
              description: req.body.description,
              street: req.body.street,
              phone: req.body.phone,
              email: req.body.email
            })
            .then(function(item) {
              if (!item) {
                return res.status(500).send({
                  error: 'Failed to create item'
                });
              }
              res.json(item);
            })
            .catch(function(err) {
              res.status(500).send({
                error: err.message || err.errors[0].message
              });
            });
        } else {
          res.status(416).json({
            error: 'Not enough arguments/values to create item.'
          });
        }
      },

      all: function(req, res) {
        Items.findAll({
          order: [
            ['id', 'DESC']
          ],
          include: [{
            model: Images
          }, {
            model: Reviews,
            include: [Users]
          }, {
            model: Categories
          }]
        }).then(function(item) {
          res.json(item);
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        return Items.find({
          where: {
            id: req.params.id
          },
          include: [Images, Reviews, Categories]
        }).then(function(item) {
          if (!item) {
            res.status(404).send({
              message: 'Item not found'
            });
          }
          res.json(item);
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Items.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).send({
              error: 'Update failed'
            });
          }
          res.json({
            message: 'Item has been updated.'
          });
        }).catch(function(err) {
          return res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Items.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).send({
              error: 'Delete failed'
            });
          }
          res.status(200).send({
            message: 'Delete successful'
          });
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      }
    };

  };

})();
