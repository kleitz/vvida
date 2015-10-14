describe('Users Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Users, $http;
  beforeEach(inject(function($injector) {
    Users = $injector.get('Users');
    $http = $injector.get('$http');
  }));

  describe('Users unit tests', function() {
    it('login should be a function', function() {
      expect(Users.login).toBeDefined();
      expect(typeof Users.login).toBe('function');
    });

    it('$http and its method post should be defined', function() {
      expect($http.post).toBeDefined();
      expect(typeof $http.post).toBe('function');
    });
  });
});
