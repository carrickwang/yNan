'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:TrainplanCtrl
 * @description
 * # TrainplanCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('TrainplanCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();
    commonService.getData(ALL_PORT.PageForTrainingPlan.url, 'POST', ALL_PORT.PageForTrainingPlan.data).then(function (res) {
      $scope.planList = res;
      //console.log($scope.planList);
    })

  });
