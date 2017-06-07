'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmpolicyandnotify
 * @description
 * # tmPolicyAndNotify
 */
angular.module('luZhouApp')
  .directive('tmPolicyAndNotify', function ($compile,$location) {
    return {
      templateUrl: 'components/tmPolicyAndNotify.html',
      restrict: 'EA',
      scope:{
          myNewsData:'=myData',
          title:'=myTitle'
      },
      controller:function () {

      },
      // compile:function (element,scope) {
      //     console.log(element);
      //     console.log(element.find('h4')[0]);
      //     var html="<a href='#/newsinfo/:{{myNewsData.ID}}' class='pull-right'>更多&nbsp;&nbsp;+</a>";
      //     //var template=angular.element(html);
      //     //angular.element().after($compile(template)(scope));
      //     angular.element(element.find('h4')[0]).after($compile(html)(scope));
      //
      // },
      link: function (scope, element, attrs) {

      }
    };
  });
