'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ServicelistCtrl
 * @description
 * # ServicelistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('ServicelistCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();
  });
