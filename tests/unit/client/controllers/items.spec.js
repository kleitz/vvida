describe('ItemCtrl tests', function() {
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
    },

    Reviews,
    Categories;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('ItemCtrl', {
      $scope: scope,
      Items: Items,
    });
    Utils = $injector.get('Utils');
    Categories = $injector.get('Categories');
    Reviews = $injector.get('Reviews');
  }));

  it('should init the controller', function() {
    spyOn(Items, 'query').and.callThrough();
    spyOn(Categories, 'query').and.callThrough();
    scope.init();
    expect(scope.categories).toBeDefined();
    expect(scope.recentItems).toBeDefined();
    expect(scope.item).toBeDefined();
    expect(Items.query).toHaveBeenCalled();
    expect(Categories.query).toHaveBeenCalled();
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
    scope.addItems();
    expect(Items.save).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Item not created');
  });

  it('should call Items.save', function() {
    spyOn(Items, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.item = true;

    scope.addItems();
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
    expect(scope.images).toEqual([1, 3, 4]);
  });

  it('should call Categories.get', function() {
    spyOn(Categories, 'get');
    scope.getCategory();
    expect(Categories.get).toHaveBeenCalled();
  });

  it('should call Utils.toast', function() {
    spyOn(Utils, 'toast');
    scope.showToast();
    expect(Utils.toast).toHaveBeenCalledWith('Upload complete');
  });

  it('should call Reviews.save', function() {
    scope.itemReview = {};
    scope.item = {};
    spyOn(Reviews, 'save');
    scope.addItemReview();
    expect(Reviews.save).toHaveBeenCalled();
  });

  it('should call uploader.uploadAll', function() {
    scope.currentUser = currentUser;
    scope.getItem();
    expect(scope.uploader.uploadAll).toBeDefined();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
  });

  it('should return array of length n', function() {
    var range = scope.range(9);
    expect(range).toBeTruthy();
    expect(range.length).toBe(9);
  });

  it('should set itemReview.rating', function() {
    scope.itemReview = {
      rating: 0
    };
    scope.rate(9);
    expect(scope.itemReview.rating).toBe(9);
  });

  it('should set image', function() {
    scope.setImage(9);
    expect(scope.selectedImage).toBe(9);
  });

  it('should return average review', function() {
    var reviews = [{
      rating: 5
    }, {
      rating: 5
    }];
    var avgReview = scope.averageReview(reviews);
    expect(avgReview).toBe(5);
  });

});
