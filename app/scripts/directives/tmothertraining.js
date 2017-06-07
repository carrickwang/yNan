'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmothertraining
 * @description
 * # tmothertraining
 */
angular.module('luZhouApp')
  .directive('tmOtherTraining', function () {
    return {
      templateUrl: 'components/tmOtherTraining.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
