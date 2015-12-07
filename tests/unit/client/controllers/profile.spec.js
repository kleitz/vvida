describe('ProfileCtrl tests', function() {
  var scope,
    controller, Utils, Users, Countries, $rootScope;
  var currentUser = {
    city: 'Nairobi',
    country: 'Kenya',
    created_at: '2015-11-30T08:27:51.129Z',
    dob: '1941-09-29T21:00:00.000Z',
    email: 'koske.hannah@gmail.com',
    enabled: 'yes',
    facebook_auth_id: null,
    facebook_auth_token: null,
    firstname: 'Hannah',
    gender: 'female',
    google_auth_id: null,
    google_auth_token: null,
    id: 1,
    img_public_id: 'mpoibjealpmx2pmgc33a',
    img_url: 'http://res.cloudinary.com/vvida/image/upload/v1448872085/' +
      'mpoibjealpmx2pmgc33a.png',
    lastname: 'Koske',
    password: '$2a$10$mzOv0oTX/pNtl1f5HxTZZ.' +
      'LgHMBA2UHPYygq8AtdXeFpfoSGiw32u',
    role: 'user',
    status: 'active',
    token: null,
    updated_at: '2015-12-01T09:29:08.522Z',
    username: 'HannahCK',
  };

  beforeEach(function() {
    module('vvida');
  });

  beforeEach(function() {
    inject(function($injector) {
      $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      $rootScope = $injector.get('$rootScope');
      $rootScope.currentUser = currentUser;
      controller = $controller('ProfileCtrl', {
        $scope: scope
      });
      Utils = $injector.get('Utils');
      Users = $injector.get('Users');
      Countries = $injector.get('Countries');
      spyOn(scope, 'editProfile').and.callThrough();
      spyOn(scope, 'showToast').and.callThrough();
      spyOn(scope, 'upload');
      spyOn(Countries, 'getCountries');
      spyOn(Users, 'update');
      scope.showToast();
      scope.upload();
      scope.editProfile();
    });
    inject(function(_$rootScope_) {
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(module(function($provide) {
    $provide.value('$rootScope.currentUser', currentUser);
  }));

  it('should define and call scope.editProfile', function() {
    expect(scope.editProfile).toBeDefined();
    expect(scope.editProfile).toHaveBeenCalled();
  });

  it('should define and call scope.showToast', function() {
    expect(scope.showToast).toBeDefined();
    expect(scope.showToast).toHaveBeenCalled();
  });

  it('should define and call scope.upload', function() {
    expect(scope.upload).toBeDefined();
    expect(scope.upload).toHaveBeenCalled();
  });

  // it('should define and call scope.uploader.onCompleteItem', function() {
  //   expect(scope.scope.uploader.onCompleteItem).toBeDefined();
  //   expect(scope.scope.uploader.onCompleteItem).toHaveBeenCalled();
  // });

  it('should call Countries.getCountries', function() {
    expect(Countries.getCountries).toBeDefined();
    expect(Countries.getCountries).toHaveBeenCalled();
  });

  it('should call Users.update', function() {
    expect(Users.update).toBeDefined();
    expect(Users.update).toHaveBeenCalled();
  });


});
