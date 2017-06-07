'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmarticlecategory
 * @description
 * # tmarticlecategory
 */
angular.module('luZhouApp')
  .directive('tmArticleCategory', function () {
    return {
      templateUrl: 'components/tmArticleCategory.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
