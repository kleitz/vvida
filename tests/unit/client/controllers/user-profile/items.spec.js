describe('UserProductsCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Utils,
    Items = {
      save: function(item, cb) {
        item ? cb(item) : cb(false);
      },
      update: function(item, cb) {
        item ? cb(item) : cb(false);
      },
      get: function(id, cb) {
        cb({
          message: 'I am groot',
          Images: [1, 3, 4]
        });
      },
      query: function() {
        return [{
          message: 'I am groot',
          Images: [1, 3, 4]
        }];
      }
    },
    Users = {
      items: function(currentUser, cb) {
        var res;
        if (currentUser) {
          res = {
            Items: [1, 2, 3]
          };
        }
        cb(!currentUser, res);
      }
    },
    currentUser = {
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
      controller = $controller('UserProductsCtrl', {
        $scope: scope,
        Users: Users,
        Items: Items
      });
      Utils = $injector.get('Utils');
    });

  });

  it('should call get Users items and set message', function() {
    scope.currentUser = false;
    spyOn(Users, 'items').and.callThrough();
    scope.init();
    expect(Users.items).toHaveBeenCalled();
    expect(scope.message).toBe('Your products goes here.');
  });

  it('should call get Users items and set items', function() {
    scope.currentUser = currentUser;
    spyOn(Users, 'items').and.callThrough();
    scope.init();
    expect(Users.items).toHaveBeenCalled();
    expect(scope.message).not.toBeTruthy();
  });

  it('should call Items.update', function() {
    scope.currentUser = currentUser;
    scope.item = {
      message: 'I am groot'
    };
    spyOn(Items, 'update').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.updateItem();
    expect(Items.update).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('I am groot');
  });

  it('should call Items.save and fail', function() {
    spyOn(Items, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.item = false;
    scope.addItem();
    expect(Items.save).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Item not created');
  });

  it('should call Items.save', function() {
    spyOn(Items, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.item = true;

    scope.addItem();
    expect(Items.save).toHaveBeenCalled();
    expect(Utils.toast).not.toHaveBeenCalled();
  });

  it('should call Items.get', function() {
    scope.currentUser = currentUser;
    spyOn(Items, 'get').and.callThrough();
    scope.getItem();
    expect(scope.uploader).toBeDefined();
    expect(Items.get).toHaveBeenCalled();
    expect(scope.item).toEqual({
      message: 'I am groot',
      Images: [1, 3, 4]
    });
  });

  it('should call uploader.uploadAll', function() {
    scope.currentUser = currentUser;
    scope.getItem();
    expect(scope.uploader.uploadAll).toBeDefined();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
  });
});
