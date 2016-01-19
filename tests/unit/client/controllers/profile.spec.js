describe('ProfileCtrl tests', function() {
  'use strict';
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
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      $rootScope = $injector.get('$rootScope');
      $rootScope.currentUser = currentUser;
      controller = $controller('ProfileCtrl', {
        $scope: scope
      });
      Utils = $injector.get('Utils');
      Users = $injector.get('Users');
      Countries = $injector.get('Countries');
    });
    inject(function(_$rootScope_) {
      $rootScope = _$rootScope_;
    });

  });


  it('should init the controller', function() {
    scope.init();
    expect(scope.uploader).toBeDefined();
  });

  it('should update user Profile', function() {
    spyOn(Users, 'update');
    scope.editProfile();
    expect(Users.update).toHaveBeenCalled();
  });

  it('should call Utils.toast', function() {
    spyOn(Utils, 'toast');
    scope.showToast();
    expect(Utils.toast).toHaveBeenCalledWith('Upload complete');
  });

  it('should call uploader.uploadAll', function() {
    scope.init();
    expect(scope.uploader.uploadAll).toBeDefined();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
    expect(scope.uploader.onCompleteItem).toBeDefined();

  });

  it('should Countries.getCountries should be defined', function() {
    expect(Countries.getCountries).toBeDefined();
  });

});
