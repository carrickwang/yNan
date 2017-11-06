'use strict';

describe('Controller: TraininfoCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var TraininfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TraininfoCtrl = $controller('TraininfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TraininfoCtrl.awesomeThings.length).toBe(3);
  });
});
