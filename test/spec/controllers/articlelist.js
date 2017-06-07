'use strict';

describe('Controller: ArticlelistCtrl', function () {

  // load the controller's module
  beforeEach(module('luZhouApp'));

  var ArticlelistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticlelistCtrl = $controller('ArticlelistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticlelistCtrl.awesomeThings.length).toBe(3);
  });
});
