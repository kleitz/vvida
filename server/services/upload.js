(function() {
  'use strict';

  var images = require('../schemas/images'),
    cloudinary = require('cloudinary'),
    multer = require('multer');

  module.exports = {
    uploadImage: function(req, res, next) {
      console.log(req.file);
      if (req.file) {
        cloudinary.uploader.upload(req.file.path, function(result) {
          if (result) {
            return images.create({
              public_id: result.public_id,
              img_url: result.url
            }).then(function(image) {
              req.img_id = image.id;
              next();
            }).catch(function(err) {
              res.status(500).send({
                error: err.message || err.errors[0].message
              });
            });
          } else {
            res.json({
              error: 'Error uploading Image'
            });
          }
        });
      } else {
        next();
      }
    },
  };
})();
