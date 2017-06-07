'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmexaminfo
 * @description
 * # tmexaminfo
 */
angular.module('luZhouApp')
  .directive('tmExamInfo', function () {
    return {
      templateUrl: 'components/tmExamInfo.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
