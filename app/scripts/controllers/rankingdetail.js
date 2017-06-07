'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:RankingdetailCtrl
 * @description
 * # RankingdetailCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('rankingDetailCtrl', function ($scope, $http, $routeParams, $loading, commonService,$location) {

    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();
    //退出
    $scope.loginOut = commonService.loginOut;
    $scope.token = commonService.AntiForgeryToken();
    //请求用户信息
    commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
      $scope.userMessage = response.Data;
    });

    if($routeParams.rankingType == 'governmentRanking'){
      //单位排行
      commonService.getData(ALL_PORT.LeftGroupRank.url, 'POST',
        $.extend({}, ALL_PORT.LeftGroupRank.data, { page: '1', rows: '30'}))
        .then(function(response) {
          $loading.finish('rankingList');
          $scope.govermentRanking = response.Data;
        });
    }else{
      //课程点击排行
      $loading.start('courseRankingList');
      commonService.getData(ALL_PORT.CourseClickRank.url, 'POST',
        $.extend({}, ALL_PORT.CourseClickRank.data, { page: '1', rows: '30'}))
        .then(function(response) {
          $loading.finish('courseRankingList');
          $scope.courseRankingList = response.Data;
        });
    }
  });
