(function() {
  'use strict';

  var cloudinary = require('cloudinary'),
    cloudinaryUpload = function(req, path, cb) {
      var Images = req.app.get('models').Images;
      cloudinary.uploader.upload(path, function(result) {
        console.log(req.body.id, result.public_id);
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

  module.exports = {
    image: function(req, res) {
      console.log(req.files, req.body);
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
      var Images = req.app.get('models').Images;
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
})();
