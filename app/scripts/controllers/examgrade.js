'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExamgradeCtrl
 * @description
 * # ExamgradeCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('examGradeCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams) {
    $scope.ExamID = $routeParams.ExamID;
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();


    //请求成绩单数据
    commonService.getData(ALL_PORT.ExamGrade.url, 'POST', $.extend({}, ALL_PORT.ExamGrade.data, {ExamID:$scope.ExamID})).then(function(response) {
      $scope.dataList = response.Data;
    });



  });
