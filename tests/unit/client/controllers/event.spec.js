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
      query: function(params) {
        if (typeof params === 'function') {
          params([1, 2, 3, 4, 5, 6]);
        } else {
          var page = params.page || 0,
            limit = params.limit || 3,
            start = limit * page,
            end = start + limit;
          return [1, 2, 3, 4, 5, 6].slice(start, end);
        }
      }
    },
    state, stateParams;
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
    stateParams = $injector.get('$stateParams');
    Utils = $injector.get('Utils');
  }));

  // initialize state
  it('should load events on init', function() {
    spyOn(Events, 'query').and.callThrough();
    scope.init();
    expect(scope.loadEvents).toBeDefined();
  });

  it('should get an event', function() {
    stateParams.id = 1;
    spyOn(Events, 'get').and.callThrough();
    scope.getEvent();
    expect(scope.eventId).toBe(1);
    expect(scope.event.message).toBe('Sample Event Message');
  });

  it('should return date and time', function() {
    spyOn(Utils, 'parseTime').and.callThrough();
    var testDate = new Date(),
      eventTime = scope.getTime(testDate);
    expect(Utils.parseTime).toHaveBeenCalledWith(testDate);
    expect(eventTime.day).toBeDefined();
    expect(eventTime.time).toBeDefined();
  });

  it('should return average rating for an event', function() {
    var eventReview = [{
      title: 'Test Review 1',
      rating: 5
    }, {
      title: 'Test Review 2',
      rating: 6
    }, {
      title: 'Test Review 3',
      rating: 5
    }];
    var avgRating = scope.averageReview(eventReview);
    expect(avgRating).toBe(5);
  });

  it('should set Selected Image', function() {
    var img_url = './images/test.png';
    scope.setImage(img_url);
    expect(scope.selectedImage).toBe('./images/test.png');
  });

});
