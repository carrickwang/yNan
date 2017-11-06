'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExaminfoCtrl
 * @description
 * # ExaminfoCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('ExaminfoCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();
    //请求用户信息
    commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
      $scope.userMessage = response.Data;
    });
    //获取考试信息列表
    $scope.paginationConf = {
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 10, //每页显示的条数
      pagesLength: 6,
      perPageOptions: [10, 20, 30, 40, 50]
    };
    $scope.getTrainData = function (options) {
      commonService.getData(ALL_PORT.ExamListForPage.url, 'POST',
        $.extend({}, ALL_PORT.ExamListForPage.data,options))
        .then(function(response) {
          $scope.examInfoList = response;
          $scope.paginationConf.totalItems = response.length;
        });
    };
    $scope.$watch('paginationConf.currentPage', function() {
      // 发送给后台的请求考试信息列表
      var pageOptions = {
        page: $scope.paginationConf.currentPage
      };
      $scope.getTrainData(pageOptions);
    });
    //站内搜索
    commonService.searchAll();
  });
