// events api
// this api will handle all the routes for events
var cloudinary = require('cloudinary'),
  multer = require('multer');
// var upload = multer({
//   dest: '/Users/Andela8/projects/vvida/uploads/'
// }).single('photo');

var upload = multer({
  dest: 'uploads/'
});
module.exports = function(app) {
  app.route('/api/upload')
    .post(upload.fields([{
      name: 'photo',
      maxCount: 1
    }]), function(req, res, next) {
      res.send({
        files: req.files,
        file: req.file
      });
    });
};
