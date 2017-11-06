'use strict';

describe('Filter: formatString', function () {

  // load the filter's module
  beforeEach(module('luZhouApp'));

  // initialize a new instance of the filter before each test
  var formatString;
  beforeEach(inject(function ($filter) {
    formatString = $filter('formatString');
  }));

  it('should return the input prefixed with "formatString filter:"', function () {
    var text = 'angularjs';
    expect(formatString(text)).toBe('formatString filter: ' + text);
  });

});
