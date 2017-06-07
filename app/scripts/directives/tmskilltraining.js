'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmskilltraining
 * @description
 * # tmskilltraining
 */
angular.module('luZhouApp')
  .directive('tmSkillTraining', function () {
    return {
      templateUrl: 'components/tmSkillTraining.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
