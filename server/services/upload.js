(function() {
  'use strict';

  var images = require('../schemas/images'),
    cloudinary = require('cloudinary'),
    multer = require('multer'),

    cloudinaryUpload = function(req, path, cb) {
      cloudinary.uploader.upload(path, function(result) {
        console.log(req.item.dataValues.id, result.public_id);
        if (result && !result.error) {
          return images.create({
            item_id: req.item.dataValues.id,
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
      if (req.files) {
        var path = req.files[0].path;
        cloudinaryUpload(req, path, function(err, image) {
          if (image) {
            res.json(image);
          }
          res.status(400).send({
            error: 'Upload'
          });
        });
      } else {
        next();
      }
    },

    images: function(req, res) {
      req.item.dataValues.images = [];
      req.item.dataValues.errors = [];
      if (req.files) {
        var callback = function(err, image) {
          if (image) {
            req.item.dataValues.images.push({
              id: image.dataValues.id,
              url: image.dataValues.url
            });
          }
          if (err) {
            req.item.dataValues.errors.push(err);
          }
          console.log(counter, req.files.length);
          counter++;
          if (counter === req.files.length) {
            req.item.images = images;
            res.send(req.item);
          }
        };
        var counter = 0;
        for (var i = 0; i < req.files.length; i++) {
          var path = req.files[i].path;
          cloudinaryUpload(req, path, callback);
        }
      } else {
        res.send(req.item);
      }
    },
  };


})();
