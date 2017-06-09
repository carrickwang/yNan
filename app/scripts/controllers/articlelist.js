'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ArticlelistCtrl
 * @description
 * # ArticlelistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('articleListCtrl', function ($scope, $http, $routeParams, $loading, commonService,$location) {
    $scope.categoryId = $routeParams.categoryId;
    //console.log($scope.categoryId)
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();

    //获取文章分类
    commonService.getData(ALL_PORT.ArticleCategory.url,'POST',
      $.extend({}, ALL_PORT.ArticleCategory.data))
      .then(function(response) {
        $scope.categoryData = response.Data;
        //console.log($scope.categoryData);
      });
    //获取文章列表
    $scope.paginationConf = { //学习课程获得学时
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 20, //每页显示的条数one
      pagesLength: 6,
      perPageOptions: [10, 20, 30, 40, 50]
    };
    $scope.search = '';
    var params = {
      categoryId:$scope.categoryId,
      page:1,
      rows:20
    };
    $scope.refreshList = function (options) {
      params.categoryId = options.categoryId?options.categoryId:params.categoryId;
      commonService.getData(ALL_PORT.ArticleList.url,'POST',
        $.extend({}, ALL_PORT.ArticleList.data,params,options))
        .then(function(response) {
          $scope.articleListData = response.Data;
          $scope.paginationConf.totalItems = response.Data.Count;
          //console.log($scope.articleListData);
        });
    };
    // $scope.refreshList();
    $scope.$watch('paginationConf.currentPage', function() {

      // 发送给后台的请求文章列表
      var pageOptions = {
        page: $scope.paginationConf.currentPage
      };
      $scope.refreshList(pageOptions);
    });
    //站内搜索
    commonService.searchAll();

  });
