describe('LoginCtrl tests', function() {
  var scope,
    Users,
    controller;

  beforeEach(function() {
    module('vvida');
  });


  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('LoginCtrl', {
      $scope: scope
    });
    Users = $injector.get('Users');

  }));

  it('should call the login function in the Users service', function() {
    spyOn(Users, 'login');
    scope.login();
    expect(Users.login).toBeDefined();
    expect(Users.login).toHaveBeenCalled();
  });

  it('should call the save function in the Users service', function() {
    spyOn(Users, 'save');
    scope.user = {
      passwordSignup: 'Password1234',
      confirmPassword: 'Password1234'
    }
    scope.signup();
    expect(Users.save).toHaveBeenCalled();
  });

  it('should reject short passwords', function() {
    scope.user = {
      passwordSignup: 'Pass',
      confirmPassword: 'Pass'
    }
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).toEqual('Your password needs to have a length greater than 8 characters');
    expect(typeof scope.messageSignup).toBe('string');
  });

  it('should ensure password is alphanumeric', function() {
    scope.user = {
      passwordSignup: 'Passworder',
      confirmPassword: 'Passworder'
    }
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).toEqual('Your password need to contain both numbers and non-word characters');
  });

  it('should ensure password as both case characters', function() {
    scope.user = {
      passwordSignup: 'password1234',
      confirmPassword: 'password1234'
    }
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).toEqual('Your password need to contain both uppercase and lower characters');
  });

});
