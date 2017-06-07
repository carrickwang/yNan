'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmrankingdetail
 * @description
 * # tmrankingdetail
 */
angular.module('luZhouApp')
  .directive('tmRankingDetail', function () {
    return {
      templateUrl: 'components/tmRankingDetail.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
