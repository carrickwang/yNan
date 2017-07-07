'use strict';

/**
 * @ngdoc filter
 * @name luZhouApp.filter:examtime
 * @function
 * @description
 * # examtime
 * Filter in the luZhouApp.
 */
angular.module('luZhouApp')
  .filter('examTime', function () {
    return function (input) {
      if (!input) {
        return "";
      }
      var ss = (input/1000)%60;
      var mm = parseInt(input/60000);
      return mm+"分钟"+ss+"秒";
    };
  });
