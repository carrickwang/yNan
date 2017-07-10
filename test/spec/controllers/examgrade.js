'use strict';

describe('Controller: ExamgradeCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var ExamgradeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExamgradeCtrl = $controller('ExamgradeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExamgradeCtrl.awesomeThings.length).toBe(3);
  });
});
