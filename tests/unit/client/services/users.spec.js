describe('Users Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Users;
  beforeEach(inject(function($injector) {
    Users = $injector.get('Users');
  }));

  describe('Users unit tests', function() {
    it('login should be a function', function() {
      expect(Users.login).toBeDefined();
      expect(typeof Users.login).toBe('function');
    });

  });
});
