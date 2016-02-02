angular.module('vvida.services')
  .factory('Images', ['$http', function($http) {
    var obj={};
    obj.delete=function(id,cb) {
      $http.delete('/api/image/'+id).success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };
    return obj;
  }]);
