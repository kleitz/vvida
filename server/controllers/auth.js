(function() {
  'use strict';

  var jwt = require('jsonwebtoken');
  var Authorize = function() {};
  Authorize.prototype = {
    authenticate: function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.headers['x-access-token'] || req.params('token') || req.body.token;
      // decode token
      if (token && token !== 'null') {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
          if (err) {
            err = new Error('Failed to authenticate token.');
            // 403 -- forbidden
            res.status(403).json({
              error: err.message
            });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
      } else {
        // if there is no token
        // return an error
        var err = new Error('Unauthorised. No user is logged in.');
        res.status(401).json({
          error: err.message
        });
      }
    }
  };

  module.exports = new Authorize();
})();
