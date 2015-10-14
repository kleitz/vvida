angular.module('vvida.services')
  .factory('ProductResource', ['$resource', '$http', function($resource, $http) {
    return $resource('/api/items/:id', {
      id: '@id'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
  }])

.factory('Products', ['ProductResource'], function(UserResource, cb) {
  products = new ProductResource();

  return {
    getAllProducts: function() {
      return Products.query();
    },

    getProductById: function(productId) {
      return users.get({
        id: productId
      });
    },

    updateProduct: function(productId) {
      return users.update({
        id: productId
      });
    },

    deleteProduct: function(productId) {
      return users.$delete({
        id: productId
      });
    }
  };
});
