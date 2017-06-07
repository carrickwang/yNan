'use strict';

describe('Filter: getKey', function () {

  // load the filter's module
  beforeEach(module('luZhouApp'));

  // initialize a new instance of the filter before each test
  var getKey;
  beforeEach(inject(function ($filter) {
    getKey = $filter('getKey');
  }));

  it('should return the input prefixed with "getKey filter:"', function () {
    var text = 'angularjs';
    expect(getKey(text)).toBe('getKey filter: ' + text);
  });

});
