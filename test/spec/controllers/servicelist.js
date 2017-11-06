'use strict';

describe('Controller: ServicelistCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var ServicelistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServicelistCtrl = $controller('ServicelistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ServicelistCtrl.awesomeThings.length).toBe(3);
  });
});
