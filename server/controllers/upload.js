(function() {
  'use strict';
  module.exports = function(app) {
    var Images = app.get('models').Images,
      Users = app.get('models').Users,
      cloudinary = require('cloudinary'),
      cloudinaryUpload = function(req, path, cb) {
        cloudinary.uploader.upload(path, function(result) {
          if (result && !result.error) {
            return Images.create({
              item_id: req.body.id,
              event_id: req.body.eventId,
              user_id: req.body.userId,
              public_id: result.public_id,
              img_url: result.url
            }).then(function(image) {
              cb(null, image);
            }).catch(function(err) {
              cb(err, null);
            });
          } else {
            cb(result.error, null);
          }
        });
      };

    return {
      image: function(req, res) {
        if (req.files) {
          var path = req.files[0].path;
          cloudinaryUpload(req, path, function(err, image) {
            if (image) {
              res.json(image);
            } else {
              res.status(400).send({
                error: 'Upload'
              });
            }
          });
        }
      },

      userImgUpload: function(req, res) {
        if (req.files) {
          var path = req.files[0].path;
          var cb = function(err, image) {
            if (image) {
              res.json(image);
            } else {
              res.status(400).send({
                error: 'Upload'
              });
            }
          };

          cloudinary.uploader.upload(path, function(result) {
            if (result && !result.error) {
              return Users.update({
                img_public_id: result.public_id,
                img_url: result.url
              }, {
                where: {
                  id: req.body.id
                }
              }).then(function(image) {
                if (image) {
                  cb(null, result.url);
                }
              }).catch(function(err) {
                cb(err, null);
              });
            } else {
              cb(result.error, null);
            }
          });
        }
      },

      delete: function(req, res, next) {
        cloudinary.uploader.destroy(req.params.id, function(result) {
          if (result) {
            req.info = result;
            console.log(req.info);
            next();
          } else {
            res.status(400).send({
              error: 'Delete failed'
            });
          }
        });
      },

      deleteImage: function(req, res) {
        return Images.destroy({
          where: {
            public_id: req.params.id
          }
        }).then(function(ok) {
          if (!ok) {
            req.info.db = {
              error: 'Delete failed'
            };
            res.status(500).send(req.info);
          } else {
            req.info.db = {
              message: 'Delete succesful'
            };
            res.status(200).send(req.info);
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
