// events api
// this api will handle all the routes for events
var cloudinary  = require('cloudinary');
module.exports = function(app) {
  app.route('/api/upload')
  .post(function(req, res, next) {
   if(req.files.file) {
     cloudinary.uploader.upload(req.files.file.path, function(result) {
       if (result.url) {
         req.imageLink = result.url;
         next();
       } else {
         res.json(error);
       }
     });
   } else {
     next();
   }
 });
};
