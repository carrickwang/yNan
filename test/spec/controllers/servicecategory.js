'use strict';

describe('Controller: ServicecategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var ServicecategoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServicecategoryCtrl = $controller('ServicecategoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ServicecategoryCtrl.awesomeThings.length).toBe(3);
  });
});
