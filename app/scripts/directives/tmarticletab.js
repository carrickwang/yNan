'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmarticletab
 * @description
 * # tmarticletab
 */
/*angular.module('luZhouApp')
  .directive('tmArticleTab', function () {
    return {
      templateUrl: 'components/tmArticleTab.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });*/
angular.module('luZhouApp')
  .directive('tmArticleTab', tmArticleTab);
function tmArticleTab() {
  return {
    templateUrl: 'components/tmArticleTab.html',
    restrict: 'EA',
    link: function postLink(scope, element, attrs) {

    }
  };
}
