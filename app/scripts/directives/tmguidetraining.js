'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmguidetraining
 * @description
 * # tmguidetraining
 */
angular.module('luZhouApp')
  .directive('tmGuideTraining', function () {
    return {
      templateUrl: 'components/tmGuideTraining.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
