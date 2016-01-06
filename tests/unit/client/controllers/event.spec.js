describe('EventCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Utils,
    Events = {
      save: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      update: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
    },
    state;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('EventCtrl', {
      $scope: scope,
      Events:Events
    });
    state = $injector.get('$state');
    Utils = $injector.get('Utils');


  }));
  it('should init the controller', function() {
    scope.init();
    expect(scope.uploader).toBeDefined();
  });

  it('should define an event and fail', function() {
    scope.event = false;
    spyOn(Events, 'save').andCallThrough();
    spyOn(Utils, 'toast').andCallThrough();
    scope.addEvent();
    expect(Events.save).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Event not created');
  });


  it('should define and add an event', function() {
    scope.event = {
      user_id: 1,
      name: 'Sample Event',
      description: 'Sample Event Description',
      location: 'Sample Event Location',
      venue: 'Sample Event Venue',
      time: new Date(Date.now),
      sponsor: 'Sample Event Sponsor',
      message: 'Sample Event Message'
    };
    spyOn(Events, 'save').andCallThrough();
    spyOn(Utils, 'toast').andCallThrough();
    scope.addEvent();
    expect(Events.save).toHaveBeenCalled();
    expect(Utils.toast).not.toHaveBeenCalled();
  });

  it('should define and update an event', function() {
     scope.event = {
      message: 'Sample Event Message'
    };
    spyOn(Events, 'update').andCallThrough();
    spyOn(Utils, 'toast').andCallThrough();
    scope.updateEvent();
    expect(Events.update).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Sample Event Message');
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
