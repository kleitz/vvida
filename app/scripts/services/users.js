angular.module('vvida.services')
.factory('Users',function($resource) {
  return $resource('/api/users/:id');
});