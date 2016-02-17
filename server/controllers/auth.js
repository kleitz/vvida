(function() {
  'use strict';
  var jwt = require('jsonwebtoken');

  module.exports = {
    authenticate: function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.headers['x-access-token'] || req.params.token ||
        req.session.user.token;
      // decode token
      if (token && token !== 'null') {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
          if (err) {
            res.status(403).json({
              error: 'Failed to authenticate token.'
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
        return res.status(401).send({
          error: 'Unauthorised. No user is logged in.'
        });
      }
    }
  };

})();
