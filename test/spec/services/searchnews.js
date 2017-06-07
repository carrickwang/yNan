'use strict';

describe('Service: searchNews', function () {

  // load the service's module
  beforeEach(module('luZhouApp'));

  // instantiate service
  var searchNews;
  beforeEach(inject(function (_searchNews_) {
    searchNews = _searchNews_;
  }));

  it('should do something', function () {
    expect(!!searchNews).toBe(true);
  });

});
