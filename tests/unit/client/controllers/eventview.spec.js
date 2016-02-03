describe('EventViewsCtrl tests', function() {
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
      query: function(params, cb) {
        var page = params.page || 0,
          limit = params.limit || 3,
          start = limit * page,
          end = start + limit;
        var res = [1, 2, 3, 4, 5, 6].slice(start, end);
        if (cb) {
          cb(res);
        } else {
          return res;
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
    controller = $controller('EventViewsCtrl', {
      $scope: scope,
      Events: Events
    });
    state = $injector.get('$state');
    stateParams = $injector.get('$stateParams');
    Utils = $injector.get('Utils');
  }));

  // initialize state
  it('should set scope attributes on init', function() {
    spyOn(scope, 'viewEvents').and.callThrough();
    scope.init();
    expect(scope.page).toBeDefined();
    expect(scope.viewType).toBeDefined();
    expect(scope.viewEvents).toHaveBeenCalled();
    expect(scope.loadEvents).toBeDefined();
  });

  it('should get events based on pages', function() {
    scope.page = 0;
    spyOn(Events, 'query').and.callThrough();
    spyOn(scope, 'viewEvents').and.callThrough();
    scope.viewEvents(scope.page);
    expect(scope.limit).toBe(3);
    expect(Events.query).toHaveBeenCalledWith({
      limit: 3,
      page: 0
    });
    expect(scope.loadEvents).toBeDefined();
    expect(scope.loadEvents).toEqual([1, 2, 3]);
  });

  it('should set view type', function() {
    spyOn(scope, 'setViewType').and.callThrough();
    spyOn(scope, 'updateStateParams').and.callThrough();
    scope.setViewType('list');
    expect(scope.viewType).toBe('list');
    expect(scope.updateStateParams).toHaveBeenCalled();
  });

  it('should update state parameters', function() {
    scope.page = 0;
    scope.viewType = 'list';
    spyOn(state, 'go');
    spyOn(scope, 'updateStateParams').and.callThrough();
    scope.updateStateParams();
    expect(state.go).toHaveBeenCalledWith('events.all', {
      page: 0,
      view: 'list'
    });
  });

  it('should load previous page of events', function() {
    state.params.page = 1;
    spyOn(scope, 'viewEvents').and.callThrough();
    spyOn(Events, 'query').and.callThrough();
    spyOn(scope, 'updateStateParams').and.callThrough();
    scope.prevEvents();
    expect(scope.page).toBe(0);
    expect(scope.viewEvents).toHaveBeenCalledWith(scope.page);
    expect(Events.query).toHaveBeenCalledWith({
      limit: 3,
      page: 0
    });
    expect(scope.loadEvents).toBeDefined();
    expect(scope.loadEvents).toEqual([1, 2, 3]);
  });

  it('should load next page of events', function() {
    state.params.page = 1;
    spyOn(scope, 'viewEvents').and.callThrough();
    spyOn(Events, 'query').and.callThrough();
    spyOn(scope, 'updateStateParams').and.callThrough();
    scope.nextEvents();
    expect(scope.page).toBe(2);
    expect(scope.viewEvents).toHaveBeenCalledWith(scope.page);
    expect(Events.query).toHaveBeenCalledWith({
      limit: 3,
      page: 1
    });
    expect(scope.loadEvents).toBeDefined();
    expect(scope.loadEvents).toEqual([4, 5, 6]);
  });

  it('should disable next button', function() {
    scope.page = 2;
    scope.limt = 3;
    spyOn(Events, 'query').and.callThrough();
    scope.disableNext();
    expect(Events.query).toHaveBeenCalled();
    expect(scope.nextButton).toBe(true);
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

});
