// Items api
// this api will handle all the routes for items
(function() {
  'use strict';
  var upload = require('../controllers/upload');
  module.exports = function(app) {

    app.route('/api/image')
      // create item route.
      .post(upload.image);
    app.route('/api/image/:id')
      .delete(upload.delete, upload.deleteImage);
  };
})();