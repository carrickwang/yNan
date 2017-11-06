'use strict';

describe('Controller: ExaminfoCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var ExaminfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExaminfoCtrl = $controller('ExaminfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExaminfoCtrl.awesomeThings.length).toBe(3);
  });
});
