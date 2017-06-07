'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:SearchresultCtrl
 * @description
 * # searchResultCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('searchResultCtrl', function($scope, $location, $loading, $routeParams, commonService) {

        $loading.start('tmsearchresult');

        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();

        $scope.isResult = true;
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100,
            itemsPerPage: 10, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.$watch('paginationConf.currentPage', function() {

            // 发送给后台的请求数据
          commonService.getData(ALL_PORT.SearchAll.url, 'POST', $.extend({},{page:$scope.paginationConf.currentPage,rows:10},{Key: $routeParams.text}))
            .then(function(response) {
              $loading.finish('tmsearchresult');
              $scope.searchList = response.Data;
              $scope.paginationConf.totalItems = response.Data.Count;
              //console.log($scope.searchList.Count);

            });

        });

    });
