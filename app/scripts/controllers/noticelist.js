'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:NoticelistCtrl
 * @description
 * # NoticelistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('noticeListCtrl', function ($scope, $http, $routeParams, $loading, commonService,$location) {

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


    //获取文章列表
    $scope.paginationConf = {
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 20, //每页显示的条数
      pagesLength: 6,
      perPageOptions: [10, 20, 30, 40, 50]
    };

    var params = {
      page: 1,
      rows: 20
    };
    //通知公告
    $scope.refreshList = function (options) {
      commonService.getData(ALL_PORT.noticeAnnouncement.url, 'POST',
        $.extend({}, ALL_PORT.noticeAnnouncement.data,params,options))
        .then(function(response) {
          $loading.finish('rankingList');
          $scope.noticeListData = response.Data;
          $scope.paginationConf.totalItems = response.Data.Count;
        });
    };
    $scope.$watch('paginationConf.currentPage', function() {
      // 发送给后台的请求文章列表
      var pageOptions = {
        page: $scope.paginationConf.currentPage
      };
      $scope.refreshList(pageOptions);
    });
    //站内搜索
    $scope.searchText = '';
    $scope.tipText = '';
    $scope.searchNow = function () {
      if($scope.searchText ==''){
        $scope.tipText = "输入不能为空";
      }else{
        $location.path('/search/' + $scope.searchText);
      }
    };
    $scope.hideTip = function () {
      $scope.tipText = "";
    }

  });
