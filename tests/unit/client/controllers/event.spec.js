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
      get: function(id, cb) {
        cb({
          message: 'Sample Event Message'
        });
      },
      query: function(){
        return [1,2,3];
      }
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
      Events: Events
    });
    state = $injector.get('$state');
    Utils = $injector.get('Utils');


  }));
  it('should init the controller', function() {
    spyOn(Events, 'query').and.callThrough();
    scope.init();
    expect(scope.lists).toBeTruthy();
    expect(scope.eventCat).toEqual('Popular Events');
    expect(scope.loadEvents).toBeDefined();
  });

  it('should set eventCat', function() {
    spyOn(scope, 'close').and.callThrough();
    scope.setCat(2);
    expect(scope.eventCat).toBe(2);
    expect(scope.close).toHaveBeenCalled();
  });

  it('should define an event and fail', function() {
    scope.event = false;
    spyOn(Events, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
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
    spyOn(Events, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.addEvent();
    expect(Events.save).toHaveBeenCalled();
    expect(Utils.toast).not.toHaveBeenCalled();
  });

  it('should define and update an event', function() {
    scope.event = {
      message: 'Sample Event Message'
    };
    spyOn(Events, 'update').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.updateEvent();
    expect(Events.update).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Sample Event Message');
  });

  it('should get an event', function() {
    spyOn(Events, 'get').and.callThrough();
    scope.getEvent();
    expect(Events.get).toHaveBeenCalled();
    expect(scope.event).toEqual({
      message: 'Sample Event Message',
      time: null
    });
  });

  it('should call Utils.toast', function() {
    spyOn(Utils, 'toast');
    scope.showToast();
    expect(Utils.toast).toHaveBeenCalledWith('Upload complete');
  });

  it('should call uploader.uploadAll', function() {
    scope.getEvent();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
  });

});
