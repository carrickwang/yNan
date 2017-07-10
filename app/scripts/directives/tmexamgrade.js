'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmexamgrade
 * @description
 * # tmexamgrade
 */
angular.module('luZhouApp')
  .directive('tmExamGrade', function () {
    return {
      template: 'components/tmExamGrade.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
