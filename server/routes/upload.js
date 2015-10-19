// events api
// this api will handle all the routes for events
var cloudinary = require('cloudinary'),
  multer = require('multer');
// var upload = multer({
//   dest: '/Users/Andela8/projects/vvida/uploads/'
// }).single('photo');

module.exports = function(app) {
  app.route('/api/upload')
    .post(function(req, res) {
      if (req.files) {
        req.files.forEach(function(file) {
          var url =[];
          cloudinary.uploader.upload(file.path, function(result) {
            if (result.url) {
              res.url = result.url;
            } else {
              res.json({
                error: 'Image not uploaded'
              }).then(function() {
                res.send(url);
              });
            }
          });
        });

      }
    });
};
