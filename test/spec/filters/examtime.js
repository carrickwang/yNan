'use strict';

describe('Filter: examtime', function () {

  // load the filter's module
  beforeEach(module('luZhouApp'));

  // initialize a new instance of the filter before each test
  var examtime;
  beforeEach(inject(function ($filter) {
    examtime = $filter('examtime');
  }));

  it('should return the input prefixed with "examtime filter:"', function () {
    var text = 'angularjs';
    expect(examtime(text)).toBe('examtime filter: ' + text);
  });

});
