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
    scope.getItem();
    expect(scope.uploader.uploadAll).toBeDefined();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
  });

});
