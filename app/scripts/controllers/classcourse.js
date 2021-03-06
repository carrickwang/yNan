'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ClasscourseCtrl
 * @description
 * # ClasscourseCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('classCourseCtrl', function($scope, $loading, $routeParams, commonService) {
        $scope.Id = $routeParams.Id;
        $scope.type = $routeParams.Type;

        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //loading
        $loading.start('classMy');
        $loading.start('classCourse');
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

        //班级课程
        $scope.queryClassCourse = function(pageOptions) {
            var classCourse = commonService.getData(ALL_PORT.ClassCourse.url, 'POST',
                $.extend({}, ALL_PORT.ClassCourse.data, { Id: $scope.Id, type: $scope.type }, pageOptions))
            classCourse.then(function(response) {
                $loading.finish('classCourse');
                $scope.Data = response.Data;
                $scope.paginationConf.totalItems = response.Data.Count;
            })
        };

        // 通过$watch currentPage 当他们一变化的时候，重新获取数据条目
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据
            var pageOptions = {
                page: $scope.paginationConf.currentPage,
            };

            $scope.queryClassCourse(pageOptions);

        });




    });