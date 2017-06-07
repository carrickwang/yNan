'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:NewsinfoCtrl
 * @description
 * # newsInfoCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('newsInfoCtrl', function($scope, commonService, $location, $routeParams, $loading) {

        $loading.start('tmnewswithphoto');
        $loading.start('tmnewswithoutphoto');

        $scope.searchNewsField = '请输入关键字';
        $scope.isNews = true;
        $scope.isNewsInfo=true;

        $scope.findNews = function() {
            $location.path('/search/' + $routeParams.ID + '/' + $scope.searchNewsField);
        };


        $scope.ID = $routeParams.ID;

        $scope.itemsPerPage = 20;
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100, //$scope.totalItems,
            itemsPerPage: 20, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据

            // console.log($scope.paginationConf);
            commonService.getData(ALL_PORT.ArticleList.url, 'POST',
                    $.extend({}, ALL_PORT.ArticleList.data, { page: $scope.paginationConf.currentPage, rows: $scope.itemsPerPage, categoryId: $scope.ID }))
                .then(function(response) {
                    $loading.finish('tmnewswithphoto');
                    $loading.finish('tmnewswithoutphoto');

                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.newsData = response.Data;
                });

        });




    });