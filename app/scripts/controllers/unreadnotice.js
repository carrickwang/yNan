'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:UnreadnoticeCtrl
 * @description
 * # unReadNoticeCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('unReadNoticeCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;

        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data)
            .then(function(response) {
                $scope.userMessage = response.Data;
            });


        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 20,
            itemsPerPage: 2, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.queryUnReadNotice = function(options) {
            commonService.getData(ALL_PORT.UnReadNotice.url, 'POST', $.extend({}, ALL_PORT.UnReadNotice.data, options))
                .then(function(response) {
                    $scope.noticeData = response.Data;
                    $scope.paginationConf.totalItems = $scope.noticeData.Count;
                    $scope.paginationConf.itemsPerPage = ALL_PORT.UnReadNotice.data.rows;
                });
        }
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.queryUnReadNotice(options);

        });

    });