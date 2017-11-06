'use strict';

describe('Filter: formatString1', function () {

  // load the filter's module
  beforeEach(module('luZhouApp'));

  // initialize a new instance of the filter before each test
  var formatString1;
  beforeEach(inject(function ($filter) {
    formatString1 = $filter('formatString1');
  }));

  it('should return the input prefixed with "formatString1 filter:"', function () {
    var text = 'angularjs';
    expect(formatString1(text)).toBe('formatString1 filter: ' + text);
  });

});
