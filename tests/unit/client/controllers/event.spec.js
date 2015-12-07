describe('EventCtrl tests', function() {
  var scope,
    controller, Utils, Events, state;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('EventCtrl', {
      $scope: scope
    });
    state = $injector.get('$state');
    Events = $injector.get('Events');
    Utils = $injector.get('Utils');
    spyOn(scope, 'addEvent').and.callThrough();
    spyOn(scope, 'updateEvent').and.callThrough();
    spyOn(scope, 'showToast').and.callThrough();
    spyOn(scope, 'upload').and.callThrough();
    spyOn(Events, 'save').and.callThrough();
    spyOn(Events, 'update').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    spyOn(state, 'go').and.callThrough();
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
    scope.addEvent();
    scope.updateEvent();
    scope.showToast();
    scope.upload();
  }));

  it('should define and call scope.addEvent', function() {
    expect(scope.addEvent).toBeDefined();
    expect(scope.addEvent).toHaveBeenCalled();
  });

  it('should define and call scope.updateEvent', function() {
    expect(scope.updateEvent).toBeDefined();
    expect(scope.updateEvent).toHaveBeenCalled();
  });

  it('should define and call scope.showToast', function() {
    expect(scope.showToast).toBeDefined();
    expect(scope.showToast).toHaveBeenCalled();
  });

  it('should define scope.event', function() {
    expect(scope.event).toBeDefined();
  });

  it('should report that Events.save was called', function() {
    expect(Events.save).toBeDefined();
    expect(Events.save).toHaveBeenCalled();
  });

  it('should report that Events.update was called', function() {
    expect(Events.update).toBeDefined();
    expect(Events.update).toHaveBeenCalled();
  });

  it('should report that Utils.toast was called', function() {
    expect(Utils.toast).toBeDefined();
    expect(Utils.toast).toHaveBeenCalled();
  });

  it('should report that $scope.upload was called', function() {
    expect(scope.upload).toBeDefined();
    expect(scope.upload).toHaveBeenCalled();
  });


});
