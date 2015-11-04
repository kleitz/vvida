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

  },
  delete: function(req, res) {

  },
  getAll: function(req, res) {

  },
  find: function(req, res) {

  }
};
