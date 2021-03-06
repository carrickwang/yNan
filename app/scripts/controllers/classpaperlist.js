'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ClasspaperlistCtrl
 * @description
 * # classPaperListCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('classPaperListCtrl', function($scope, $loading, $routeParams, commonService) {
        $scope.Id = $routeParams.Id;

        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //loading
        $loading.start('classMy');
        $loading.start('classPaperList');
        $loading.start('personalLearningInfo');

        //个人学习信息
        var classInfomation = commonService.getData(ALL_PORT.ClassInformation.url, 'POST', $.extend({}, ALL_PORT.ClassInformation.data, { Id: $scope.Id }))
        classInfomation.then(function(response) {
            $loading.finish('personalLearningInfo');
            $scope.classInfoData = response.Data;
        });


        //我的班级
        var classMy = commonService.getData(ALL_PORT.ClassMy.url, 'POST', ALL_PORT.ClassMy.data);
        classMy.then(function(response) {
            $loading.finish('classMy');
            $scope.classMyData = response.Data;
        });


        //分页
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100,
            itemsPerPage: 12, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };


        //班级论文
        $scope.queryClassPaperList = function(pageOptions) {
            commonService.getData(ALL_PORT.ClassPaperList.url, 'POST', $.extend({}, ALL_PORT.ClassPaperList.data, { Id: $scope.Id }, pageOptions))
                .then(function(response) {
                    $loading.finish('classPaperList');
                    $scope.classPaperListData = response.Data;
                    $scope.paginationConf.totalItems = response.Data.Count;
                });
        };


        // 通过$watch currentPage 当他们一变化的时候，重新获取数据条目
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据
            var pageOptions = {
                page: $scope.paginationConf.currentPage,
            };

            $scope.queryClassPaperList(pageOptions);

        });



    });