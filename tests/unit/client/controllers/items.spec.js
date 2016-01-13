describe('ItemCtrl tests', function() {
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
          Images : [1, 3, 4]
        });
      }
    },
    Categories;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('ItemCtrl', {
      $scope: scope,
      Items: Items
    });
    Utils = $injector.get('Utils');
    Categories = $injector.get('Categories');
  }));

  it('should init the controller', function() {
    scope.init();
    expect(scope.uploader).toBeDefined();
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
    expect(Items.get).toHaveBeenCalled();
    expect(scope.item).toEqual({
      message: 'I am groot',
      Images : [1, 3, 4]
    });
    expect(scope.images).toEqual([1,3,4]);
  });

  it('should call Categories.query', function() {
    spyOn(Categories, 'query');
    scope.loadCategories();
    expect(Categories.query).toHaveBeenCalled();
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
  });

});
