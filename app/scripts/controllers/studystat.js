'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:StudystatCtrl
 * @description
 * # StudystatCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('StudystatCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;
        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
            $scope.userMessage = response.Data;
        });

        //个人学习统计
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 20,
            itemsPerPage: 2, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.n = 0;
        $scope.requestMyStudyStat = function(options) {
            $loading.start('studyStat');
            $scope.paginationConf.itemsPerPage = ALL_PORT.MyStudyStat.data.rows;
            var params = $.extend({}, ALL_PORT.MyStudyStat.data, options);
            commonService.getData(ALL_PORT.MyStudyStat.url, 'POST',
                    params)
                .then(function(response) {
                    $loading.finish('studyStat');
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.studyStatData = response.Data;

                    if ($scope.n == 0) {
                        $scope.startTime = response.Data.StartDate;
                        $scope.endTime = response.Data.EndDate;
                        $scope.n = 1;
                    }
                });
        };
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.requestMyStudyStat(options);
        });
      //站内搜索
      commonService.searchAll();

    });
