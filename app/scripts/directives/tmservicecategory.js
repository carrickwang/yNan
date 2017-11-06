'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmservicecategory
 * @description
 * # tmservicecategory
 */
angular.module('luZhouApp')
  .directive('tmServiceCategory', function () {
    return {
      templateUrl: 'components/tmServiceCategory.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
