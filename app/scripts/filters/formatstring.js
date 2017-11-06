'use strict';

/**
 * @ngdoc filter
 * @name luZhouApp.filter:formatString
 * @function
 * @description
 * # formatString
 * Filter in the luZhouApp.
 */
angular.module('luZhouApp')
  .filter('formatString', function () {
    return function (input) {
      return input.split('-')[0];
    };
  });
