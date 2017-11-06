'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:TestcenterCtrl
 * @description
 * # TestcenterCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('TestcenterCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
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


        //考试中心
        $scope.selectedName = {};
        $scope.showOrNot = true;
        //搜索title
        $scope.searchTitle = '';
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 5, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50]
        };
        // $scope.courseStatus = [
        //     { name: '全部', id: 'All' },
        //     { name: '已通过', id: '' },
        //     { name: '未通过', id: '' },
        //     { name: '未完成', id: '' }
        // ];
        $scope.vm = {};
        $scope.UnPassList = [];
        $scope.PassList  = [];
        $scope.MockList = [];
        $scope.formalFlag =1;
        $scope.mockFlag = 0;
        $scope.formalType = 'formal';
        $scope.mockType = 'mock';
        //考试列表请求
        $scope.searchMyCenterCourse = function(option, mark) {
            $loading.start('examList');
            if (mark == 1) {
                if (option.examType == "Finish") {
                    $scope.vm.activeTab = 3;
                } else {
                    $scope.vm.activeTab = 1;
                }
            }
            var params = $.extend({}, ALL_PORT.ExamList.data, option);
            //console.log(params);
            commonService.getData(ALL_PORT.ExamList.url, 'POST',
                    params)
                .then(function(response) {
                    $loading.finish('examList');
                    $scope.MockList = [];
                    $scope.TotalData = response.Data;
                    if($scope.vm.activeTab==1){
                      $scope.paginationConf.totalItems = response.Data.UnFinishCount;
                    }else if($scope.vm.activeTab==3){
                      $scope.paginationConf.totalItems = response.Data.FinishPassCount;
                    }else if($scope.vm.activeTab==5){
                      $scope.paginationConf.totalItems = response.Data.FinishNotPassCount;
                    }else {
                      $scope.paginationConf.totalItems = response.Data.UnFinishCount;
                    }

                    // if (params.examType == "Finish") {
                    //     $scope.paginationConf.totalItems = response.Data.FinishCount == null ? 0 : response.Data.FinishCount;
                    //     // console.log($scope.paginationConf.totalItems);
                    // } else {
                    //     $scope.paginationConf.totalItems = response.Data.UnFinishCount == null ? 0 : response.Data.UnFinishCount;
                    // }
                    //console.log($scope.paginationConf);
                });
        }

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

        //参加测试
        $scope.havTest = function(Id,flag,type) {
            var params = $.extend({}, ALL_PORT.Exam.data, $scope.token, { parameter1: Id })
            commonService.getData(ALL_PORT.Exam.url, 'POST',
                params)

            .then(function(response) {
                if(flag == 1){
                    if (response.Type) {
                      //Type存在，意味着不能考试
                      alert(response.Message);
                    } else {
                      // $location.path("/exam/exam/" + Id);
                      window.open("#/exam/exam/" +type+'/'+ Id);
                    }
                }else{
                  window.open("#/exam/exam/" +type+'/'+ Id);
                }


            });
        };
      //站内搜索
      commonService.searchAll();
    });
