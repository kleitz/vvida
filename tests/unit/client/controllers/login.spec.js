describe('LoginCtrl tests', function() {
  var scope,
    Users,
    controller;

  beforeEach(function() {
    module('vvida');
  });

  beforeEach(module(function($provide) {
    scope = {
      user: {
        passwordSignup: 'Password12#',
        confirmPassword: 'Password12#'
      },
      messageSignup: 'message'
    };
    $provide.value('$scope', scope);
  }));

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    Users = $injector.get('Users');
    controller = $controller('LoginCtrl');
    spyOn(Users, 'login').and.callThrough();
    spyOn(Users, 'save').and.callThrough();
    spyOn(scope, 'signup').and.callThrough();
    spyOn(scope, 'login').and.callThrough();
    spyOn(scope, 'facebook');
    spyOn(scope, 'google');
    scope.signup();
    scope.login();
    scope.google();
    scope.facebook();
  }));

  it('should define and call $scope.login', function() {
    expect(scope.login).toBeDefined();
    expect(scope.login).toHaveBeenCalled();
  });

  it('should define and call $scope.signup', function() {
    expect(scope.signup).toBeDefined();
    expect(scope.signup).toHaveBeenCalled();
  });

  it('should define and call $scope.google', function() {
    expect(scope.google).toBeDefined();
    expect(scope.google).toHaveBeenCalled();
  });

  it('should define and call $scope.facebook', function() {
    expect(scope.facebook).toBeDefined();
    expect(scope.facebook).toHaveBeenCalled();
  });

  it('should call the login function in the Users service', function() {
    expect(Users.login).toBeDefined();
    expect(Users.login).toHaveBeenCalled();
  });

  it('should call the save function in the Users service', function() {
    expect(Users.save).toBeDefined();
    expect(Users.save).toHaveBeenCalled();
  });

  it('should define scope.messageSignup', function() {
    expect(scope.messageSignup).toBeDefined();
    expect(typeof scope.messageSignup).toBe('string');
    expect(scope.messageSignup).toBe('message');
  });

});
