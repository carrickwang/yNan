'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:StudyplanCtrl
 * @description
 * # StudyplanCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('StudyplanCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
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
        //学习计划
        $scope.token = commonService.AntiForgeryToken();
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 20,
            itemsPerPage: 2, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.requestStudyPlan = function(options) {
            $loading.start('studyPlan');
            $scope.paginationConf.itemsPerPage = ALL_PORT.MyStudyPlan.data.rows;
            var params = $.extend({}, ALL_PORT.MyStudyPlan.data, options);
            commonService.getData(ALL_PORT.MyStudyPlan.url, 'POST',
                    params)
                .then(function(response) {
                    $loading.finish('studyPlan');
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.stydyPlanData = response.Data;

                });
        };
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.requestStudyPlan(options);
        });

        //添加计划
        $scope.remindCycle = ['每天一次', '每周一次', '每月一次'];
        $scope.planAdd = function(id) {
            commonService.getData(ALL_PORT.StudyPlanAdd.url, 'POST',
                    $.extend({}, ALL_PORT.StudyPlanAdd.data, { courseId: id }))
                .then(function(response) {
                    $scope.planAddData = response.Data;
                    $scope.PlanFinishDate = commonService.dateFilter(response.Data.PlanFinishDate, 'yyyy-MM-dd');
                    $scope.RemindDate = commonService.dateFilter(response.Data.RemindDate, 'yyyy-MM-dd');
                    $scope.selectCycle = response.Data.RemindCycle == '' ? "每天一次" : response.Data.RemindCycle;

                });
        }

        //提交编辑计划
        $scope.addPlanUpdate = function(options) {
            var addPlanUpdateParams = $.extend({}, ALL_PORT.EditStudyPlanUpdate.data, $scope.token, options);
            commonService.getData(ALL_PORT.EditStudyPlanUpdate.url, 'POST',
                    addPlanUpdateParams)
                .then(function(response) {
                    $('.modal').modal('hide');
                    alert(response.Message);
                    $scope.requestStudyPlan();
                });
        }

        //删除学习计划
        $scope.delStudyPlan = function(id) {
            commonService.getData(ALL_PORT.DelStudyPlan.url, 'POST',
                    $.extend({}, ALL_PORT.DelStudyPlan.data, $scope.token, { id: id }))
                .then(function(response) {
                    alert(response.Message);
                    $scope.requestStudyPlan();
                });
        };
      //站内搜索
      commonService.searchAll();
    });
