'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmservicelist
 * @description
 * # tmservicelist
 */
angular.module('luZhouApp')
  .directive('tmServiceList', function () {
    return {
      templateUrl: 'components/tmServiceList.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
