'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExamdetaillistCtrl
 * @description
 * # ExamdetaillistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('ExamdetaillistCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;
        $scope.token = commonService.AntiForgeryToken();
        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data)
            .then(function(response) {
                $scope.userMessage = response.Data;
            });

        //考试记录
        $loading.start('examDetail');
        $scope.Id = $routeParams.Id;
        $scope.token = commonService.AntiForgeryToken();
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 20,
            itemsPerPage: 2, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.requestExamDetail = function(options) {
            $scope.paginationConf.itemsPerPage = ALL_PORT.ExamDetailListItem.data.rows;
            var params = $.extend({}, ALL_PORT.ExamDetailListItem.data, options, { examid: $scope.Id });
            commonService.getData(ALL_PORT.ExamDetailListItem.url, 'POST', params)
                .then(function(response) {
                    $loading.finish('examDetail');
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.examDetailData = response.Data;

                });
        };
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.requestExamDetail(options);
        });
    });