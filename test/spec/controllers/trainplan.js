'use strict';

describe('Controller: TrainplanCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var TrainplanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrainplanCtrl = $controller('TrainplanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrainplanCtrl.awesomeThings.length).toBe(3);
  });
});
