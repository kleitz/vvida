module.exports = {
  create: function(req, res) {
    var Categories = req.app.get('models').Categories;
    Categories.sync()
      .then(
        function() {
          return Categories
            .create({
              type: req.body.type
            })
            .then(
              function(category) {
                if (!category) {
                  res.status(500)
                    .send({
                      error: 'Category creation failed'
                    });
                } else {
                  res.json(category);
                }
              });
        })
      .catch(function(err) {
        res.status(500)
          .send({
            error: err.message || err.errors[0].message
          });
      });
  },
  update: function(req, res) {
    var Categories = req.app.get('models').Categories;
    Categories.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(ok, err) {
      if (err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      } else {
        res.send({
          message: 'Category updated succesfully'
        });
      }
    }).catch(function(err) {
      res.status(500).send({
        error: err.message || err.errors[0].message
      });
    });
  },
  delete: function(req, res) {
    var Categories = req.app.get('models').Categories;
    Categories.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(ok, err) {
      if (err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      } else {
        res.send({
          message: 'Category deleted succesfully'
        });
      }
    }).catch(function(err) {
      res.status(500).send({
        error: err.message || err.errors[0].message
      });
    });
  },
  getAll: function(req, res) {
    var Categories = req.app.get('models').Categories;
    Categories.findAll().then(function(review) {
      res.json(review);
    }).catch(function(err) {
      res.status(500).send({
        error: err.message || err.error[0].message
      });
    });
  },
  find: function(req, res) {
    var Categories = req.app.get('models').Categories,
      catId = req.params.id;
    Categories.findOne({
      where: {
        id: catId
      }
    }).then(function(category, err) {
      if (!category) {
        res.status(404).send({
          message: 'Category not found'
        });
      } else if (err) {
        res.status(500).send({
          message: 'Error retrieving category',
          err: err
        });
      } else {
        res.send(category);
      }
    }).catch(function(err) {
      res.status(500).send({
        error: err.message || err.errors[0].message
      });
    });
  }
};
