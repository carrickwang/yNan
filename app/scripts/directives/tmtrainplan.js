'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmtrainplan
 * @description
 * # tmtrainplan
 */
angular.module('luZhouApp')
  .directive('tmTrainPlan', function () {
    return {
      templateUrl: 'components/tmTrainPlan.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
