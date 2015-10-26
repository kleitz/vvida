(function() {
  'use strict';

  var images = require('../schemas/images'),
    cloudinary = require('cloudinary'),
    multer = require('multer');
  var cloudinaryUpload = function(path, cb) {
    cloudinary.uploader.upload(path, function(result) {
      if (result) {
        return images.create({
          public_id: result.public_id,
          img_url: result.url
        }).then(function(image) {
          cb(null, image);
        }).catch(function(err) {
          cb(err, null);
        });
      } else {
        err = {
          error: 'Upload failed'
        };
        cb(err, null);
      }
    });
  };

  module.exports = {
    image: function(req, res, next) {
      //console.log(req.file);
      if (req.file) {
        var path = req.file.path;
        cloudinaryUpload(path, function(err, image) {
          if (image) {
            req.img_id = image.dataValues.id;
          }
          next(err);
        });
      } else {
        next();
      }
    },

    images: function(req, res, next) {
      console.log(req.file);
      if (req.files) {
        var callback = function(err, image) {
          if (image) {
            req.image = image;
          } else {
            next(err);
          }
          counter++;
        };
        var counter = 0;
        for (var i = 0; i < req.files.length; i++) {
          var path = req.file.path;
          this.cloudinaryUpload(path, callback);
          if (num === req.files.length) {
            next();
          }
        }
      } else {
        next();
      }
    },
  };


})();
