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

  // initialize state based on state parameters
  describe('it should initialize based on state parameters', function() {

    beforeEach(function() {
      stateParams.view = undefined;
      stateParams.id = undefined;
    });
    it('when \'view\' is defined in state parameters', function() {
      stateParams.view = 'grid';
      spyOn(scope, 'viewEvents').and.callThrough();
      scope.init();
      expect(scope.page).toBe(0);
      expect(scope.viewType).toBe('grid');
      expect(scope.viewEvents).toHaveBeenCalledWith(0);
    });

    it('when \'id\' is defined in state parameters', function() {
      stateParams.id = 1;
      spyOn(state, 'go');
      scope.init();
      expect(state.go).toHaveBeenCalledWith('viewEvent', {
        id: 1
      });
    });

    it('when \'id\' and \'view\' is undefined in state parameters', function() {
      spyOn(state, 'go');
      spyOn(Events, 'query').and.callThrough();
      scope.init();
      expect(scope.loadEvents).toBeDefined();
      expect(state.go).toHaveBeenCalledWith('events.page');
    });

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

  it('should get an event', function() {
    stateParams.id = 1;
    spyOn(Events, 'get').and.callThrough();
    scope.getEvent();
    expect(scope.eventId).toBe(1);
    expect(scope.event.message).toBe('Sample Event Message');
  });

  it('should return date and time', function() {
    var testDate = new Date(),
      eventTime = scope.parseTime(testDate);
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
