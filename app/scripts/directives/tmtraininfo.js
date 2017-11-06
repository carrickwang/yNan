'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmtraininfo
 * @description
 * # tmtraininfo
 */
angular.module('luZhouApp')
  .directive('tmTrainInfo', function () {
    return {
      templateUrl: 'components/tmTrainInfo.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
