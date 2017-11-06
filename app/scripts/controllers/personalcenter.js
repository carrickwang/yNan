'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:PersonalcenterCtrl
 * @description
 * # PersonalcenterCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('PersonalcenterCtrl', function($scope, $http,$timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //防伪造请求
        $scope.token = commonService.AntiForgeryToken();
        //退出
        $scope.loginOut = commonService.loginOut;
        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
            $scope.userMessage = response.Data;
        });

        //学院学时排行（请勿删除）
        /*$loading.start('studentsHourRanking');
        commonService.getData(ALL_PORT.LeftUserRank.url, 'POST',
                ALL_PORT.LeftUserRank.data)
            .then(function(response) {
                $loading.finish('studentsHourRanking');
                $scope.userRankingData = response.Data;
            });*/


        //个人中心
        $scope.selectedName = {};
        //搜索title
        $scope.searchTitle = '';
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100,
            itemsPerPage: 10, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };
        $scope.courseStatus = [
            { name: '所有', id: 'All' },
            { name: '正在学习的技能课程', id: 'StudyingSkill' },
            { name: '完成的技能课程', id: 'FinishSkill' },
            { name: '正在学习的引导课程', id: 'StudyingGuidance' },
            { name: '完成的引导课程', id: 'FinishGuidance' }
        ];
        $scope.vm = {};
        //学习课程请求
        $scope.searchMyCenterCourse = function(option) {
            $loading.start('myCenter');
            var params = $.extend({}, ALL_PORT.MyCenter.data, option);
            //console.log(params);
            commonService.getData(ALL_PORT.MyCenter.url, 'POST',
                    params)
                .then(function(response) {
                    $loading.finish('myCenter');
                    $scope.TotalData = response.Data;
                    if (params.courseType == "StudyingSkill") {
                      $scope.vm.activeTab = 1;
                        $scope.paginationConf.totalItems = response.Data.Count;
                    } else if (params.courseType == "FinishSkill") {
                      $scope.vm.activeTab = 2;
                        $scope.paginationConf.totalItems = response.Data.Count;
                    } else if (params.courseType == "StudyingGuidance") {
                      $scope.vm.activeTab = 3;
                        $scope.paginationConf.totalItems = response.Data.Count;
                    }else if (params.courseType == "FinishGuidance") {
                      $scope.vm.activeTab = 4;
                      $scope.paginationConf.totalItems = response.Data.Count;
                    } else if (params.courseType == "All") {
                            $scope.paginationConf.totalItems = response.Data.Count;
                    }
                });
        }
        $scope.searchMyCenterCourse();
        //学习进度排序
        $scope.learningProgress = function(type) {
            if ($('.getorder span').html() == '▼') {
                $('.getorder span').html('▲');
                $scope.searchMyCenterCourse({ order: 'asc', courseType: type });
            } else {
                $('.getorder span').html('▼');
                $scope.searchMyCenterCourse({ order: 'desc', courseType: type });
            }
        };

        //分页
        // 通过$watch currentPage 当他们一变化的时候，重新获取数据条目
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据
            var pageOptions = {
                page: $scope.paginationConf.currentPage,
                title: $scope.searchTitle
            };
            $scope.searchMyCenterCourse(pageOptions);
        });

        //删除课程
        $scope.deleatUserCourse = function(id) {
            commonService.getData(ALL_PORT.DelUserCourseReg.url, 'POST',
                $.extend({}, ALL_PORT.DelUserCourseReg.data, $scope.token, { courseId: id }))

            .then(function(response) {
                if (response.Type == 1) {
                    alert(response.Message)
                    if ($scope.vm.activeTab == 1) {
                        $scope.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': $scope.searchTitle });
                    } else if ($scope.vm.activeTab == 2) {
                        $scope.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': $scope.searchTitle });
                    } else {
                        $scope.searchMyCenterCourse({ 'courseType': 'Finish', 'title': $scope.searchTitle });
                    }
                } else if (response.Type == 0) {
                    alert(response.Message);
                }

            });
        };
        //站内搜索
        commonService.searchAll();

    });
