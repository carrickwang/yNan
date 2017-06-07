'use strict';

describe('Controller: RankingdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var RankingdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RankingdetailCtrl = $controller('RankingdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RankingdetailCtrl.awesomeThings.length).toBe(3);
  });
});
