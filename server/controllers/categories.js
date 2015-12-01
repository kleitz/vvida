(function() {
  'use strict';
  module.exports = {

    create: function(req, res) {
      var Categories = req.app.get('models').Categories;
      return Categories.create({
        type: req.body.category,
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


    all: function(req, res) {
      var Categories = req.app.get('models').Categories;
      Categories.findAll().then(function(category) {
        res.json(category);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },


    delete: function(req, res) {
      var Categories = req.app.get('models').Categories;
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
    },


    find: function(req, res) {
      var Categories = req.app.get('models').Categories;
      return Categories.find({
        where: {
          id: req.params.id,
        }
      }).then(function(category) {
        if (!category) {
          return res.status(404).send({
            message: 'Category not found'
          });
        } else {
          res.json(category);
        }
      }).catch(function(err) {
        return res.status(500).send({
          message: 'Error retrieving category',
          error: err
        });
      });
    },
  };

})();
