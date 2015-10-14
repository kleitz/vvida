// events api
// this api will handle all the routes for events
var cloudinary = require('cloudinary'),
  multer = require('multer');
var upload = multer({
  dest: './uploads/'
}).single('photo');

module.exports = function(app) {
  app.route('/api/upload')

    .post(function(req, res, next) {
      console.log(req.files);
      upload(req, res, function(err) {
        if (err) {
          return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
      });
    });
};
