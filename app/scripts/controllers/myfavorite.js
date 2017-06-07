'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:MyfavoriteCtrl
 * @description
 * # MyfavoriteCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('MyfavoriteCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;
        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data

        ).then(function(response) {
            $scope.userMessage = response.Data;
        });

        $scope.token = commonService.AntiForgeryToken();
        //我的收藏
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 20,
            itemsPerPage: 2, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.requestMyStudyStat = function(options) {
            $loading.start('myFavorite');
            $scope.paginationConf.itemsPerPage = ALL_PORT.MyFavorite.data.rows;
            var params = $.extend({}, ALL_PORT.MyFavorite.data, options);
            commonService.getData(ALL_PORT.MyFavorite.url, 'POST',
                    params)
                .then(function(response) {
                    $loading.finish('myFavorite');
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.myFavoriteData = response.Data;

                });
        };
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.requestMyStudyStat(options);
        });


        $scope.favoriteDelete = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteDelete.data, options, token)
            commonService.getData(ALL_PORT.FavoriteDelete.url, 'POST',
                    params)
                .then(function(response) {
                    if (response.Type == 1) {
                        alert(response.Message);
                        $scope.requestMyStudyStat();
                    }
                });
        }
    });