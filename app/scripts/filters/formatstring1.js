'use strict';

/**
 * @ngdoc filter
 * @name luZhouApp.filter:formatString1
 * @function
 * @description
 * # formatString1
 * Filter in the luZhouApp.
 */
angular.module('luZhouApp')
  .filter('formatString1', function () {
    return function (input) {
      return input.split('-')[1];
    };
  });
